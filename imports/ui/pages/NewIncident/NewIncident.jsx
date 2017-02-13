import React, {Component} from 'react';
import {Page, Toolbar, BackButton, ToolbarButton} from 'react-onsenui';
import StepNav from '/imports/ui/components/StepNav/StepNav.jsx';
import NewIncidentSuccess from '/imports/ui/pages/NewIncidentSuccess/NewIncidentSuccess.jsx';
import Accordions from '/imports/ui/components/Accordion/Accordions.jsx';
import {Users, User} from '/imports/shared/collections/Users.js';
import {Incidents, Incident} from '/imports/api/collections/Incidents.js';
import ImageGallery from '/imports/ui/components/ImageGallery/ImageGallery.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import pageSchema from '/imports/shared/page-schema.js';
import ReactTransitionGroup from 'react-addons-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './NewIncident.scss';

class NewIncident extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentStep: this.props.incident.currentStep ? this.props.incident.currentStep : 1,
            isForward: true
        }
    }

    nextStep = () => {
        if (this.state.currentStep < pageSchema.length) {
            this.setState({
                currentStep: this.state.currentStep + 1,
                activeAccordion: 0,
                isForward: true
            }, ()=> {
                this.props.incident.setStep(this.state.currentStep);
            });
        }else if(this.state.currentStep === pageSchema.length){
            this.finishSteps();
        }
    };

    prevStep = () => {
        if (this.state.currentStep > 1) {
            this.setState({
                currentStep: this.state.currentStep - 1,
                activeAccordion: 0,
                isForward: false
            }, ()=> {
                this.props.incident.setStep(this.state.currentStep);
            });
        }
    };

    jumpToStep = (stepNumber) => {
        if (this.state.currentStep !== stepNumber) {
            this.setState({
                currentStep: stepNumber,
                activeAccordion: 0,
                isForward: stepNumber > this.state.currentStep
            }, ()=> {
                this.props.incident.setStep(this.state.currentStep);
            });
        }

    };

    finishSteps = () => {
        this.props.appContext.navigator.replacePage({component: NewIncidentSuccess, props: {key: "Success"}}, {
            callback: ()=> {
                this.props.incident.markCompleted();
            }
        });

    };

    rename = ()=> {
        var newName = prompt('Use a concise, descriptive title to name your incident');
        this.props.incident.update({$set: {title: newName}});
    };

    renderToolbar = () => {
        return (
            <Toolbar>
                <div className="left">
                    <BackButton>
                        {this.props.incident.completed? 'Back': 'Home'}
                    </BackButton>
                </div>
                <div className="center">
                    {this.props.incident.title}
                </div>
                <div className="right">
                    <ToolbarButton onClick={()=> {
                        this.rename()
                    }}>
                        Rename
                    </ToolbarButton>
                </div>
            </Toolbar>
        );
    };

    renderModal = () => {
        return (
            <ImageGallery
            show={this.state.showModal}
            images={this.state.images}
            index={this.state.index}
            close={this.closeModal}/>
        )
    };

    closeModal = () => {
        this.setState({showModal:false});
    };
    
    showModal = (images, index) => {
        console.log("showing modal");
        this.setState({showModal:true, images, index});
    };

    renderAccordions = (key)=> {
        let animationClass = this.state.isForward ? "step-forward" : "step-backward";
        return (
            <Accordions
                data={pageSchema}
                currentStep={this.state.currentStep}
                defaultAccordion="0"
                incident={this.props.incident}
                next={this.nextStep}
                key={key}
                showModal={this.showModal}
                className={animationClass}
            />
        );
        // return accordions;
    };

    render() {
        let key = this.state.currentStep;
        return (
            <Page
                renderToolbar={this.renderToolbar}
                renderModal={this.renderModal}>
                <div className="new-incident">
                    <ReactCSSTransitionGroup transitionEnterTimeout={300} transitionLeaveTimeout={300}
                                             transitionName="step">
                        {this.renderAccordions(key)}
                    </ReactCSSTransitionGroup>
                    <StepNav
                        steps={pageSchema}
                        currentStep={this.state.currentStep}
                        prev={this.prevStep}
                        next={this.nextStep}
                        jump={this.jumpToStep}
                        finish={this.finishSteps}
                    />
                </div>
            </Page>
        );
    }
}

export default NewIncidentContainer = createContainer((props)=> {
    const {incidentId} = props;

    let incident;

    //if we supply an incidentId we can use this to edit an incident
    if (incidentId) {
        Meteor.subscribe('SingleIncident', incidentId);
        incident = Incidents.findOne(incidentId);
    } else {
        incident = Incidents.findOne({completed: false});
    }

    return {
        incident
    }
}, NewIncident);
