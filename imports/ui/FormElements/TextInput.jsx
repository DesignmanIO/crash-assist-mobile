import React, {Component} from 'react';

// if (Meteor.isClient) {
//     onsen = require('onsenui');
//     Ons = require('react-onsenui');
//     Input = Ons.Input;
// }



export default class TextInput extends Component {
    static propTypes = {
      changeOnKeyDown: React.PropTypes.bool,
      fieldType: React.PropTypes.string,
    };

    static defaultProps = {
      changeOnKeyDown: true,
    };

    constructor(props) {
        super(props);
        this.type = props.type || 'text';
        this.state = {value: props.value};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value});
    }

    onKeyDown(event) {
        if (event.keyCode === 13) {
            this.props.onChange(this.state.value);
        }
    }

    onChange(event) {
        this.setState({value: event.target.value});
        if (this.props.changeOnKeyDown) {
            console.log('changed');
            this.props.onChange(event.target.value);
        }
    }

    render() {
        var fieldType = this.props.fieldType || this.type;
        let modifier = onsen.platform.isAndroid()? 'material': 'underbar';
        return (
            <div>
                <Input
                    ref='input'
                    modifier={modifier}
                    value={this.state.value || ''}
                    type={fieldType}
                    placeholder={this.props.label}
                    disabled={this.props.disabled}
                    onChange={this.onChange.bind(this)}
                    onKeyDown={this.onKeyDown.bind(this)}
                    onBlur={() => this.props.onChange(this.state.value)}
                    className={this.props.className}
                    {...this.passProps}
                />
                <p>{this.props.errorMessage}</p>
            </div>
        );
    }
}


// password
// class PasswordFieldComponent extends TextFieldComponent {
//     constructor(props) {
//         super(props);
//         this.type = 'password';
//     }
// }

// color
// class ColorFieldComponent extends TextFieldComponent {
//     constructor(props) {
//         super(props);
//         this.type = 'color';
//     }
// }
