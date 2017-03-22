/**
 * Created by Julian on 2/13/17.
 */
import React from 'react';
import TextInput from '../TextInput';
import hoistNonReactStatic from 'hoist-non-react-statics';

class EmailInput extends TextInput {
  static defaultProps = {
    keyboardType: 'email-address',
  };

  constructor(props) {
    super(props);
  }
}

export default hoistNonReactStatic(EmailInput, EmailInput);
