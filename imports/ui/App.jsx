import React, {Component} from 'react';

import onsen from 'onsenui';

import {
    Navigator,
    Splitter,
    SplitterSide,
    SplitterContent,
    Page,
    List,
    ListItem
} from 'react-onsenui';

import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Login/Login.jsx';
import Help from './pages/Help/Help.jsx';
import PastIncidents from './pages/PastIncidents/PastIncidents.jsx';
import loginByDeviceId from '../startup/client/accounts.js';

import 'onsenui/css/onsenui.css'
import Notifications from 'react-notify-toast';
//todo: Custom theme for OnsenUi components. Mainly Android issue here as default iOS styles are ok
/*
 Custom theme can be generated from http://components2.onsen.io
 but currently there is a bug that doesn't transfer layout
 styling for ListItem components causing their elements to
 render stacked instead of side by side.
 */
//import '../startup/client/css/onsen-css-components.css';
import 'onsenui/css/onsen-css-components.css';
import './App.scss';

const splitterMenuItems = [
    {title: "Past Incidents", component: PastIncidents},
    {title: "Set Email/Password", component: Login},
    {title: "Help", component: Help}
];

let navigation;

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            menuOpen: false
        }
    }

    navigateTo(item) {
        this.handleMenu(false);
        navigation.pushPage({component: item.component, props: {key: item.title}});
    }

    handleMenu = (state) => {
        this.setState({menuOpen: state});
    };

    renderPage(route, navigator) {
        const props = route.props || {};
        navigation = this.appContext.navigator = navigator;
        props.appContext = this.appContext;

        let deviceId;
        if (typeof device !== 'undefined') {
            deviceId = device.uuid;
        }

        if (route.component !== Login) {
            loginByDeviceId(deviceId, (error)=> {
                if (error) {
                    navigator.replacePage({component: Login, props: {key: "login", isLogin: true}});
                }
            });
        }


        return React.createElement(route.component, props);
    }

    render() {
        return (
            <Splitter>
                <SplitterSide
                    side='right'
                    width={200}
                    collapse={true}
                    isSwipeable={true}
                    isOpen={this.state.menuOpen}
                    onOpen={() => this.handleMenu(true)}
                    onClose={() => this.handleMenu(false)}>
                    <Page>
                        <List
                            dataSource={splitterMenuItems}
                            renderRow={(item) => (
                                <ListItem key={item.title} onClick={()=>this.navigateTo(item)}
                                          tappable>{item.title}</ListItem>
                            )}
                        />
                    </Page>
                </SplitterSide>
                <SplitterContent>
                    <Notifications/>
                    <Navigator
                        appContext={this}
                        initialRoute={{component: Landing, props: {key: "landing"}}}
                        renderPage={this.renderPage}
                    />
                </SplitterContent>
            </Splitter>
        );
    }
}
