import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon} from 'react-onsenui';
// import onsen from 'onsenui';
import './Accordions.scss';
import Accordion from '/imports/ui/components/Accordion/Accordion.jsx';
import IncidentUpdateForm from '/imports/ui/FormElements/IncidentUpdateForm.jsx';

export default class Accordions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeAccordion: this.props.defaultAccordion,
            currentStep: this.props.currentStep - 1
        }
    }

    openAccordion = (index = this.state.activeAccordion + 1) => {
        this.setState({activeAccordion: index});
        let accordion = this.refs[`accordion-${index}`];
        $(".accordion .expander").animate({height: 0});
        if (typeof accordion === 'undefined') {
            //if they try to go next after the last one
            this.props.next();
            return;
            //only open if they didn't click the same one
        } else if (!(this.state.activeAccordion === index && $('.accordion.open').length)) {
            let expander = accordion.refs.expander;
            let accordionDom = ReactDOM.findDOMNode(accordion);
            $(accordionDom).removeClass("closed").addClass("open");
            setTimeout(function () {
                $(expander).animate({"height": $(expander).get(0).scrollHeight}, 200, function () {
                        //todo: tweak this later to make sure everything scrolls right
                        $(expander).css({height: "auto"});
                        $(".page__content").animate({scrollTop: $(accordionDom).position().top}, 200);
                    }
                );
            }, 30);
        } else {
            $(".accordion").removeClass("open").addClass("closed");
        }
    };

    componentDidMount() {
        this.openAccordion(0);
    }

    render() {
        let currentStepData = this.props.data[this.state.currentStep];
        let key = currentStepData._id;
        return (
            <div className={`accordions ${this.props.className}`} id={`accordions-${currentStepData._id}`}
                 ref="accordions" key={key}>
                {
                    currentStepData.accordions.map((accordion, index)=> {
                        let key = `${currentStepData._id}-${index}`;
                        let hasFields = accordion.fields ? accordion.fields.length : false;
                        {/*console.log(this.state.activeAccordion, index, this.state.activeAccordion*1 === index*1);*/
                        }
                        {/*let isOpen = this.state.activeAccordion*1 === index*1;*/
                        }

                        return (
                            <Accordion
                                key={key}
                                title={accordion.title}
                                index={index}
                                ref={`accordion-${index}`}
                                openAccordion={this.openAccordion}
                            >
                                {
                                    accordion.text ?
                                        <div className="content" dangerouslySetInnerHTML={{__html: accordion.text}}/>
                                        : ""
                                }
                                {
                                    hasFields ?
                                        <IncidentUpdateForm
                                            doc={this.props.incident}
                                            fields={accordion.fields}
                                            goNext={this.openAccordion}
                                            showModal={this.props.showModal}
                                        />
                                        : <Button modifier="outline" className="go-next" onClick={()=> {
                                        this.openAccordion(index + 1)
                                    }}><Icon icon="md-check"/> Next</Button>
                                }
                            </Accordion>
                        )
                    })
                }
            </div>
        )
    }
}
