/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import TextInput from "../TextInput";
import hoistNonReactStatic from "hoist-non-react-statics";

class NumberInput extends Component {
  render() {
    return <TextInput {...this.props} keyboardType="numeric" />;
  }
}

export default hoistNonReactStatic(NumberInput, NumberInput);
