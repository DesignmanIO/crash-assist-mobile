/**
 * Created by Julian on 2/13/17.
 */
import React, {PropTypes} from 'react';
import TextInput from '../TextInput';
import hoistNonReactStatic from 'hoist-non-react-statics';

class TextareaInput extends TextInput {
  static propTypes = {
    changeOnKeyDown: React.PropTypes.bool,
    fieldType: React.PropTypes.string,
    keyboardType: PropTypes.string,
  }
  static defaultProps = {
    keyboardType: 'phone-pad',
    changeOnKeyDown: true,
  };

  constructor(props) {
    super(props);
  }
}

export default hoistNonReactStatic(TextareaInput, TextareaInput);
