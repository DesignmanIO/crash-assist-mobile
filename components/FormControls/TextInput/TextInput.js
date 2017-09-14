/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import { TextInput as ShoutemInput } from "@shoutem/ui";
import { connectStyle } from "@shoutem/theme";
import _ from "lodash";

class TextInput extends Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    changeOnKeyDown: React.PropTypes.func,
    style: React.PropTypes.object,
    keyboardType: React.PropTypes.string,
    height: React.PropTypes.number,
    multiline: React.PropTypes.bool
  };

  static defaultProps = {
    keyboardType: "default"
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
    // console.log(this.props.onChange);
    // this.onChange = _.throttle(this.props.onChange, 500, { trailing: true });
  }

  // componentWillReceiveProps(nextProps) {
  // this.setState({value: nextProps.value});
  // }

  onChange(text) {
    console.log("2: passing to prop", this.state.value);
    this.setState({value: text});
    _.throttle(() => this.props.onChange(this.state.value), 500, {trailing: true});
    // this.props.onChange(text);
    // if (this.props.changeOnKeyDown) {
    //   this.props.onChange(event.target.value);
    // }
  }

  render() {
    const { style, height, value, multiline, keyboardType, passProps, fieldName } = this.props;
    return (
      <ShoutemInput
        {...this.props}
        inputRef={(input) => _.invoke(passProps, 'fieldRef', [input, fieldName])}
        value={value}
        placeholder={this.props.label}
        disabled={this.props.disabled}
        onContentSizeChange={(event) => {
          if (this.props.onContentSizeChange){
            this.props.onContentSizeChange(event.nativeEvent.contentSize);
          }
        }}
        onChangeText={text => {
          this.setState({value: text});
          this.onChange(text);
        }}
        onSubmitEditing={() => {
          const nextField = _.invoke(passProps, 'getNextField', fieldName);
          //console.log(nextField);
          if (nextField) {
            nextField.focus();
          }
        }}
        style={{...style.input, height}}
        keyboardType={keyboardType}
        multiline={multiline || false}
        returnKeyType={_.get(passProps, 'returnKeyType', 'none')}
      />
    );
  }
}

export default connectStyle("ca.component.TextInput")(TextInput);
