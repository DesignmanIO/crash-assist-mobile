import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ListItem, Icon} from 'react-onsenui';
import onsen from 'onsenui';
// import './Accordions.scss';

export default class Accordion extends Component {

    clickHandler = () => {
        let index = this.props.index;
        this.props.openAccordion(index);
    };

    render() {
        let {platform} = onsen;
        let className = ["ons-icon", "chevron"];

        if (!platform.isAndroid()) {
            className.push("ion-chevron-right", "ons-icon--ion");
        } else {
            className.push("zmdi-chevron-right", "zmdi");
        }
        // let activeClass = "closed";
            // this.props.isOpen? "open": "closed";

        return (
            <div className={`accordion closed`}>
                <div className="title list__item" onClick={this.clickHandler}>
                    <div className="left list__item__left">
                        <div ref="chevron" className={className.join(" ")} style={{fontSize: "14px"}}></div>
                    </div>
                    <div className="center list__item__center">
                        {this.props.title}
                    </div>
                </div>

                <div className="expander" ref="expander">
                    <div className="list__item">
                        <div className="center list__item__center">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
