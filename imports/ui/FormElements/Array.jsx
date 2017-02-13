import React from 'react'
import {ArrayComponent} from 'simple-react-form'
import {Meteor} from 'meteor/meteor';

if (Meteor.isClient) {
    const Ons = require('react-onsenui')
    Row = Ons.Row; Col = Ons.Col; Button = Ons.Button; Icon = Ons.Icon;
    require('./Array.scss');
}

export default class ArrayField extends ArrayComponent {

    constructor(props) {
        super(props);
    }

    renderChildrenItem({index, children}) {
        return (
            <div className={this.props.childrenClassName} key={`${this.props.fieldName}.${index}`}>
                <Row>
                    <Col width="calc(100% - 47px)" verticalAlign="center">
                        <h4>{`${this.props.passProps.arrayText} ${index + 1}`}</h4>
                        {this.renderChildrenItemWithContext({index, children})}
                    </Col>
                    <Col width="32px" verticalAlign="center">
                        {this.renderRemoveButton(index)}
                    </Col>
                </Row>
            </div>
        )
    }

    renderRemoveButton(index) {
        if (this.props.disabled) return;
        return (
            <Button modifier="outline" onClick={() => this.removeItem(index)} className="right">
                <Icon icon="md-minus"/>
            </Button>
        )
    }

    renderAddButton() {
        if (!this.props.showAddButton) return;
        if (this.props.disabled) return;
        return (
            <Button modifier="outline" onClick={() => this.addItem()} className="addButton">
                <Icon
                    icon="md-plus"/> {this.props.passProps.arrayText ? `Add ${this.props.passProps.arrayText}` : ''}
            </Button>
        )
    }

    render() {
        return (
            <div className="ArrayField">
                <div className={this.props.parentClassName}>
                    {this.renderChildren()}
                </div>
                <div>
                    {this.renderAddButton()}
                </div>
            </div>
        )
    }
}

ArrayField.propTypes = {
    ...ArrayComponent.propTypes,
    parentClassName: React.PropTypes.string,
    childrenClassName: React.PropTypes.string,
    addButtonIcon: React.PropTypes.string,
    removeButtonIcon: React.PropTypes.string
}

ArrayField.defaultProps = {
    ...ArrayComponent.defaultProps,
    parentClassName: '',
    childrenClassName: 'row',
    addButtonIcon: 'md-plus',
    removeButtonIcon: 'md-minus'
}