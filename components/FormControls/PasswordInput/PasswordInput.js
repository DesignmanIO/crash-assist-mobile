/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import TextInput from "../TextInput";
import hoistNonReactStatic from "hoist-non-react-statics";

class PasswordInput extends Component {
  render() {
    return <TextInput {...this.props} secureTextEntry autoCapitalize="none" />;
  }
}

export default hoistNonReactStatic(PasswordInput, PasswordInput);
