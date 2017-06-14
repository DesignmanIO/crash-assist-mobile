/**
 * Created by Julian on 2/13/17.
 */
// todo: change this to HOC syntax
import React, { PropTypes, Component } from "react";
import TextInput from "../TextInput";
import hoistNonReactStatic from "hoist-non-react-statics";

class TelInput extends Component {
  render() {
    return <TextInput {...this.props} keyboardType="phone-pad" />;
  }
}

export default hoistNonReactStatic(TelInput, TelInput);
