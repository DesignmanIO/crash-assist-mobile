/**
 * Created by Julian on 2/13/17.
 */
import React, {PropTypes} from 'react';
import TextInput from '../TextInput';
import hoistNonReactStatic from 'hoist-non-react-statics';

class TelInput extends TextInput {
  static propTypes = {
    multiline: PropTypes.bool,
  };
  static defaultProps = {
    multiline: true,
  };

  constructor(props) {
    super(props);
  }
};

export default hoistNonReactStatic(TelInput, TelInput);
