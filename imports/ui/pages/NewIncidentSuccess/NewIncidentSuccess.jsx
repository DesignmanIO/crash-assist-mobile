import React, {Component} from 'react';
import {Page, Icon, ProgressBar} from 'react-onsenui';
import Login from '../Login/Login.jsx';

import './NewIncidentSuccess.scss';

export default class NewIncidentSuccess extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let progress = this.state.progress;
            if (progress === 100) {
                clearInterval(this.interval);
                return;
            }
            progress++;
            this.setState({progress: progress});
        }, 20);
        setTimeout(()=> {
            if(!Meteor.user().emails){
                this.props.appContext.navigator.replacePage({component:Login, props:{key:"login"}})
            }else{
                this.props.appContext.navigator.popPage()
            }
        }, 2000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        return (
            <Page id="new-incident-success">
                <div id="new-incident-success">
                    <Icon
                        size={{default: 50, material: 40}}
                        icon={{default: 'ion-thumbsup', material: 'md-thumb-up'}}
                    />
                    <h1>All Done!</h1>
                    <p>Good Job, we knew you could do it!</p>
                    <ProgressBar value={this.state.progress}/>
                </div>
            </Page>
        )
    }
}
