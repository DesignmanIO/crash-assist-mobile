import React, { Component } from 'react';
import { Icon } from 'react-onsenui';

import './StepNav.scss';

export default class StepNav extends Component {

    renderSteps() {
       return this.props.steps.map((step, index)=>{
            let thisStep = index + 1;
            let className='step';
            if(this.props.currentStep === thisStep){
                className += ' active';
            }
            return <div className={className} key={thisStep}><div className="clickArea" onClick={()=>{this.props.jump(thisStep)}}></div><span>{thisStep}</span></div>
        })
    }

    renderPrevButton() {
        if(this.props.currentStep !== 1){
            return (
                <NavButton
                    text="PREV"
                    icon={{default: 'ion-chevron-left', material: 'md-chevron-left'}}
                    onClick={this.props.prev} />
            );
        } else {
            return <div className="placeholder"></div>
        }
    }

    renderNextButton() {
        let text = "NEXT";
        let icon = {default: 'ion-chevron-right', material: 'md-chevron-right'};
        let onClick = this.props.next;

        if(this.props.currentStep === this.props.steps.length){
            text = "FINISH";
            icon = {default: 'ion-checkmark-round', material:'md-check'};
            onClick = this.props.finish;
        }

        return <NavButton text={text} active={true} icon={icon} onClick={onClick} />
    }

    render() {
        let currentStep = this.props.steps[this.props.currentStep - 1];

        return (
            <div className="step-nav">
                <div className="stepper">
                    <div className="bar"></div>
                    <div id="steps">
                        {this.renderSteps()}
                    </div>
                </div>
                <footer>
                    {this.renderPrevButton()}

                    <div className="contextual">
                        <h1>{currentStep.title}</h1>
                        <p>{currentStep.subtitle}</p>
                    </div>

                    {this.renderNextButton()}
                </footer>
            </div>
        );
    }
}

class NavButton extends Component {
    render(){
        let className = 'navButton';
        if(this.props.active){
            className += ' active';
        }
        return (
            <div className={className} onClick={this.props.onClick}>
                <Icon
                    size={{default: 34, material: 44}}
                    icon={this.props.icon}
                    />
                <span>{this.props.text}</span>
            </div>
        );
    }
}
