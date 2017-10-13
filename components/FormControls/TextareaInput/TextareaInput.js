/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextInput as ShoutemInput } from "@shoutem/ui";
import { connectStyle } from "@shoutem/theme";
import _ from "lodash";
import { InteractionManager, TextInput as RNInput } from "react-native";

class TextAreaInput extends Component {
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
    keyboardType: "default"
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      height: 0,
      width: '100%',
    };

    this.onChange = _.throttle(this.onChange, 1000, { trailing: true });
  }

  onChange(text) {
    console.log("2: passing from TextAreaInput to prop");
    this.props.onChange(this.state.value);
  }

  render() {
    const { style, keyboardType, passProps, fieldName } = this.props;
    const { value, height, width } = this.state;
    const inputProps = { ...this.props };
    delete inputProps.onChange;
    return (
      <ShoutemInput
        {...this.inputProps}
        inputRef={input => _.invoke(passProps, "fieldRef", [input, fieldName])}
        value={value}
        placeholder={this.props.label}
        disabled={this.props.disabled}
        style={{ ...style.input, height: _.max([height + 30, 55]), width }}
        onLayout={({nativeEvent: {layout: {width}}}) => {this.setState({width})}}
        onContentSizeChange={({ nativeEvent }) => {
          const { contentSize } = nativeEvent;
          this.setState({ height: contentSize.height });
        }}
        onChangeText={text => {
          this.setState({ value: text });
          this.onChange(text);
        }}
        onSubmitEditing={() => {
          const nextField = _.invoke(passProps, "getNextField", fieldName);
          //console.log(nextField);
          if (nextField) {
            nextField.focus();
          }
        }}
        keyboardType={keyboardType}
        multiline={true}
        returnKeyType={_.get(passProps, "returnKeyType", "none")}
      />
    );
  }
}

export default connectStyle("ca.component.TextInput")(TextAreaInput);
