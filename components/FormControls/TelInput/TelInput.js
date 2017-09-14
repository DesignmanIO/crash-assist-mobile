/**
 * Created by Julian on 2/13/17.
 */
// todo: change this to HOC syntax
import React, { PropTypes, Component } from "react";
import TextInput from "../TextInput";
import hoistNonReactStatic from "hoist-non-react-statics";

class TelInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
    };
  }

  // TODO: this is broken
  render() {
    const {value} = this.state;
    const formattedNumber = (value.match(/\d/g) || []).reduce((number, digit, i, digits) => {
      let next = `${number}${digit}`;
      if ((digits.length > 3 && i === 2) || (digits.length >= 8 && i === 5)) {
        next += '-';
      } 
      return next;
    },'');
    return (
      <TextInput
        {...this.props}
        onChangeText={value => this.setState({value})}
        value={formattedNumber}
        keyboardType="numeric"
      />
    );
  }
}

export default hoistNonReactStatic(TelInput, TelInput);
