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
      value: this.props.value
    };
    this.onChange = _.throttle(this.onChange, 500, { trailing: true });
  }

  // componentWillReceiveProps(nextProps) {
  // this.setState({value: nextProps.value});
  // }

  onChange() {
    console.log("2: passing to prop", this.state.value);
    this.props.onChange(this.state.value);
    //this.props.onChange(text);
    // if (this.props.changeOnKeyDown) {
    //   this.props.onChange(event.target.value);
    // }
  }

  render() {
    const { style, height, value, multiline, keyboardType } = this.props;
    // console.log('fieldProps', this.props);
    return (
      <ShoutemInput
        ref="input"
        value={value}
        placeholder={this.props.label}
        disabled={this.props.disabled}
        onChangeText={text => {
          {/*console.log("1: keyup", text);*/}
          //this.setState({ value: text });
          this.props.onChange(text);
        }}
        onEndEditing={() => {
          //this.onChange();
        }}
        style={style.input}
        keyboardType={keyboardType}
        multiline={multiline || false}
      />
    );
  }
}

export default connectStyle("ca.component.TextInput")(TextInput);
