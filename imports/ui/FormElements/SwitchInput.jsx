import React, {Component} from 'react';
import {FieldType} from 'simple-react-form';
import TextInput from './TextInput.jsx';
import {Switch} from 'react-onsenui';

// textarea
export default class SwitchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: true
        }
    }

    handleChange = ()=> {
        this.setState({checked: !this.state.checked});
        this.props.onChange(this.state.checked);
    };

    componentDidMount(){
        this.props.onChange(this.state.checked);
    }

    render() {
        return (
            <div>
                <Switch
                    value={this.state.checked}
                    onChange={() => this.handleChange()}
                    {...this.passProps}
                    checked
                />  <span style={{lineHeight: "32px"}}>{this.props.label}</span>
            </div>
        )
    }
}