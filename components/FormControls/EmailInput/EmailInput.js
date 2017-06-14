/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import TextInput from "../TextInput";
import hoistNonReactStatic from "hoist-non-react-statics";

class EmailInput extends Component {
  render() {
    return <TextInput {...this.props} keyboardType="email-address" />;
  }
}

export default hoistNonReactStatic(EmailInput, EmailInput);
