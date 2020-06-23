/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput as RNInput } from "react-native";
import { connectStyle } from "@shoutem/theme";
import _ from "lodash";
import { InteractionManager } from "react-native";

class TextInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    changeOnKeyDown: PropTypes.func,
    style: PropTypes.object,
    keyboardType: PropTypes.string,
    height: PropTypes.number,
    multiline: PropTypes.bool
  };

  static defaultProps = {
    keyboardType: "default",
    passProps: {}
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      height: 55
    };

    this.onChange = _.throttle(this.onChange, 1000, { trailing: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange(text) {
    console.log("2: passing from textinput to prop");
    this.props.onChange(this.state.value);
    // this.props.onChange(text);
    // if (this.props.changeOnKeyDown) {
    //   this.props.onChange(event.target.value);
    // }
  }

  render() {
    const { passProps, onChange, fieldName, style, ...inputProps } = this.props;
    const { value, height } = this.state;
    // console.log('input props for ', this.props.label, Object.keys(inputProps));
    // console.log(
    //   passProps.fieldRef,
    //   inputProps.keyboardType,
    //   passProps.inputType
    // );
    return (
      <RNInput
        {...inputProps}
        ref={input => {
          _.invoke(passProps, "fieldRef", [input, fieldName]);
        }}
        value={value}
        placeholder={this.props.label}
        disabled={this.props.disabled}
        onChangeText={text => {
          this.setState({ value: text });
          this.onChange(text);
        }}
        onSubmitEditing={() => {
          // console.log('nextField', passProps.getNextField);
          const nextField = _.invoke(passProps, "getNextField", fieldName);
          if (nextField) {
            nextField.focus();
          }
        }}
        style={{ ...style.input, height }}
        returnKeyType={_.get(passProps, "returnKeyType", "none")}
        secureTextEntry={inputProps.secureTextEntry}
      />
    );
  }
}

export default connectStyle("ca.component.TextInput")(TextInput);
