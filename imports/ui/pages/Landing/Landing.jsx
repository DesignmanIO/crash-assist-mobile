import React, {Component} from 'react';
import {Page, Button, Ripple, Popover, Modal, Icon} from 'react-onsenui';
import onsen from 'onsenui';
import {Incidents, Incident} from '/imports/shared/collections/Incidents.js';
import {Users} from '/imports/shared/collections/Users.js'
import NewIncident from '/imports/ui/pages/NewIncident/NewIncident.jsx';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import './Landing.scss';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasCompleteIncidents: Incidents.find({completed: true}).count() ? true : false,
            hasIncompleteIncident: Incidents.find({completed: false}).count(),
            tooltipOpen: Incidents.find().count() ? false : true
        }
    }

    componentDidMount() {
        if (Meteor.userId()) {
            console.log('should be logged in');
        }
    }

    gotoNewIncident = () => {
        if (!Incidents.findOne({completed: false})) {
            this.setState({hasIncompleteIncident: true});
            new Incident().save();
        }
        this.props.appContext.navigator.pushPage({
            component: NewIncident,
            props: {currentStep: 1, key: "Steps"}
        });
    };
    //
    // incompleteIncidentExists() {
    //     return Incidents.findOne({completed: false}) ? true : false;
    // }

    startButton = ()=> {
        console.log(this.refs.startButton);
        return this.refs.startButton;
    };
    toggleTooltip = (state)=> {
        if (state || this.state.tooltipOpen) {
            this.setState({toolTipOpen: false});
        } else if (!state || !this.state.tooltipOpen) {
            this.setState({toolTipOpen: true});
        }
    };

    renderFirstTimeDialog = ()=> {
        // return (
        //     <Popover
        //         getTarget={this.startButton}
        //         isOpen={this.state.tooltipOpen}
        //         onOpen={this.toggleTooltip}
        //         onHide={this.toggleTooltip}
        //         isCancelable={true}
        //         direction="up down"
        //     >
        //         <p>In an accident? Start here.</p>
        //     </Popover>
        // )
    };

    hideLoginDialog = ()=> {
        console.log('hid dialog, preventing from seeing in the future');
        Users.update(Meteor.userId(), {$set: {'profile.hideLoginDialog': true}});
        // this.setState({showLoginDialog: false});
    };
    renderLoginDialog = ()=> {
        if (true) {
            return (
                <Popover
                    getTarget={()=> {
                        return this.refs.menuActuator
                    }}
                    isOpen={this.props.completeIncidents && !this.props.hideLoginDialog}
                    onOpen=""
                    onHide={this.hideLoginDialog}
                    onCancel={this.hideLoginDialog}
                    isCancelable={true}
                    direction="left right"
                >
                    <p style={{textAlign: 'center'}}><Icon icon="md-thumb-up" className="center" size={32}
                                                           style={{color: 'lightgreen'}}/></p>
                    <p>Congrats, you completed filling out an incident report! If you need to access or edit your
                        report, or set up your email and password to access your report on <a
                            href="https://crashassistapp.com">crashassistapp.com</a>, click this menu icon.</p>
                </Popover>
            )
        }
    };

    render() {
        let {navigator} = this.props.appContext;
        let modifier = "large";
        let ripple;

        if (!onsen.platform.isAndroid()) {
            modifier += " outline";
        } else {
            ripple = <Ripple />;
        }

        return (
            <Page key="landing" contentStyle={{top: 0}}>
                <div id="landing">
                    <Icon
                        id="menuActuator"
                        size={26}
                        icon='ion-navicon, material:md-menu'
                        onClick={()=>this.props.appContext.handleMenu(!this.props.appContext.state.menuOpen)}
                        ref="menuActuator"
                    />
                    <h1>Remain Calm, <span>We'll help you through this!</span></h1>
                    {/*<img src="images/crash.svg"/>*/}
                    <svg
                        version="1.1"
                        id="landing-image"
                        xmlns="http://www.w3.org/2000/svg"
                        xlinkHref="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        width="253.252px"
                        height="50.715px"
                        viewBox="0 0 253.252 50.715"
                        enableBackground="new 0 0 253.252 50.715"
                    >
                        <g id="layer1" transform="translate(-161.1029,-495.79516)">
                            <path id="path4333" d="M342.808,495.795l-8.477,7.843c-5.404,4.999-9.563,8.033-11.477,8.371c-1.65,0.293-9.525,1.281-17.5,2.197
		c-7.976,0.916-15.062,2.12-15.75,2.674c-1.948,1.568-1.67,13.386,0.333,14.154c3.5,1.344,5.401,0.579,6.782-2.725
		c2.155-5.158,6.041-7.668,11.87-7.668c4.313,0,5.411,0.447,8.364,3.4c2.123,2.123,3.4,4.377,3.4,6c0,1.43,0.562,2.608,1.25,2.62
		s11.6,0.681,24.25,1.484c12.649,0.805,25.948,1.47,29.55,1.479l6.549,0.017l1.29-3.57c1.573-4.35,6.259-7.421,11.327-7.426
		c4.608-0.005,10.129,4.479,11.82,9.603c0.981,2.976,1.559,3.461,3.8,3.2c2.22-0.258,2.753-0.944,3.345-4.307
		c0.388-2.199,0.731-6.308,0.763-9.128l0.057-5.126l-8.75-7.812c-4.812-4.298-9.915-8.867-11.338-10.155
		c-2.41-2.181-3.812-2.406-20.5-3.29c-9.852-0.522-20.848-1.149-24.436-1.393L342.808,495.795z M232.855,495.93l-24.38,1.294
		c-23.352,1.239-24.491,1.394-27,3.665c-1.44,1.305-6.613,5.94-11.495,10.3l-8.877,7.929l0.51,8.169
		c0.28,4.493,0.814,8.661,1.186,9.262c0.372,0.602,1.712,1.094,2.979,1.094c1.817,0,2.677-0.972,4.057-4.586
		c4.07-10.656,17.642-11.478,22.178-1.342l1.843,4.119l14-0.602c23.169-0.994,45.533-2.492,46.547-3.119
		c0.524-0.324,0.953-1.507,0.953-2.63c0-1.122,1.53-3.57,3.399-5.44c2.954-2.953,4.053-3.4,8.366-3.4
		c5.829,0,9.715,2.51,11.87,7.668c1.381,3.304,3.282,4.068,6.783,2.725c1.975-0.758,2.229-11.175,0.331-13.623
		c-0.933-1.204-5.061-2.032-16.25-3.262c-8.25-0.905-16.125-1.91-17.5-2.23c-1.375-0.321-6.325-4.049-11-8.286L232.855,495.93z
		 M342.367,500.388l9.543,0.178c5.25,0.098,10.198,0.429,10.996,0.734c1.068,0.41,1.448,2.338,1.448,7.342
		c0,4.561-0.41,6.909-1.25,7.164c-2.012,0.61-31.374-0.814-32.617-1.582c-1.98-1.225-1.279-2.284,5.373-8.125L342.367,500.388z
		 M233.259,500.389l6.581,5.776c3.62,3.178,6.417,6.272,6.216,6.877s-2.803,1.4-5.782,1.768c-6.255,0.77-26.465,1.492-27.93,0.998
		c-1.66-0.56-1.237-13.856,0.461-14.508c0.797-0.306,5.727-0.637,10.953-0.734L233.259,500.389z M287.855,500.642
		c-1.176,0-1.5,1.37-1.5,6.333c0,3.483,0.289,6.622,0.641,6.974c1.532,1.533,2.359-0.875,2.359-6.865
		C289.355,502.024,289.032,500.642,287.855,500.642z M278.279,501.36c-0.038,0.011-0.072,0.029-0.104,0.06
		c-0.489,0.489,0.226,3.34,1.643,6.544c1.381,3.122,2.967,5.678,3.523,5.678c1.448,0,1.317-0.57-1.644-7.168
		C280.293,503.342,278.857,501.212,278.279,501.36z M207.056,501.411l0.64,3.865c0.351,2.126,0.642,5.487,0.648,7.469l0.011,3.604
		l-7.65,0.646c-11.373,0.962-21.146,0.783-21.876-0.398c-0.748-1.21,0.83-3.694,6.279-9.889l3.9-4.435l9.023-0.432L207.056,501.411
		L207.056,501.411z M297.48,501.411c-0.939-0.004-6.125,9.822-6.125,11.712c0,0.285,0.455,0.519,1.013,0.519
		c1.445,0,6.203-11.184,5.188-12.198C297.535,501.423,297.51,501.411,297.48,501.411L297.48,501.411z M368.651,501.411l8.987,0.43
		l8.989,0.43l3.903,4.436c5.556,6.313,7.089,8.698,6.352,9.891c-0.618,1-12.266,1.148-24.278,0.308l-5.25-0.367v-4.323
		c0-2.377,0.292-5.78,0.648-7.562L368.651,501.411z M306.019,503.642c-1.251,0-9.664,8.219-9.664,9.441
		c0,1.728,3.114,0.017,6.792-3.73C307.598,504.817,308.191,503.642,306.019,503.642z M269.264,503.87
		c-0.051-0.004-0.095,0.001-0.131,0.013c-0.653,0.218,0.729,2.438,3.157,5.073c3.87,4.198,7.072,5.983,7.062,3.936
		C279.344,511.519,270.851,503.987,269.264,503.87z M267.355,523.642c-8.29,0-11.899,8.402-6.411,14.924
		c5.333,6.338,15.411,2.312,15.411-6.156C276.355,527.026,272.88,523.642,267.355,523.642z M308.355,523.642
		c-8.379,0-12.157,9.096-6.312,15.195c3.707,3.87,8.448,3.824,12.391-0.118C320.503,532.647,316.872,523.642,308.355,523.642z
		 M181.355,527.642c-4.408,0-9,4.416-9,8.655c0,4.438,1.354,6.929,4.774,8.786c3.484,1.891,4.67,1.897,8.246,0.048
		c3.599-1.86,4.979-4.311,4.979-8.834C190.355,532.058,185.763,527.643,181.355,527.642L181.355,527.642z M394.355,527.642
		c-4.408,0-9,4.416-9,8.655c0,4.427,1.346,6.915,4.774,8.826c9.261,5.163,18.271-8.058,10.148-14.892
		C398.545,528.772,395.958,527.642,394.355,527.642z"/>
                        </g>
                    </svg>
                    <div className="buttons">
                        <Button modifier={modifier}
                                onClick={this.gotoNewIncident}
                                ref="startButton"
                        >
                            {ripple}{this.props.incompleteIncidentExists ? "Continue Incident" : "New Incident"}
                        </Button>
                        {this.renderFirstTimeDialog()}
                        {this.renderLoginDialog()}
                    </div>
                </div>
            </Page>
        );
    }
}

export default LandingContainer = createContainer(()=> {
    const pastIncidentsHandle = Meteor.subscribe('PastIncidents');
    // const loading = !pastIncidentsHandle.ready();
    const pastIncidents = Incidents.find({completed: true}).fetch();
    const hideLoginDialog = Meteor._get(Meteor.user() || {}, "profile", "hideLoginDialog") || true;
    return {
        incompleteIncidentExists: !!Incidents.findOne({completed: false}),
        completeIncidents: !!pastIncidents.length,
        hideLoginDialog
    }
}, Landing);