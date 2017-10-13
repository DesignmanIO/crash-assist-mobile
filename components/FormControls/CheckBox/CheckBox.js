/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { TextInput as ShoutemInput } from "@shoutem/ui";
import {connectStyle} from '@shoutem/theme';
import { CheckBox as RNECheckBox } from "react-native-elements";
import {colors} from '../../../config/theme';

class CheckBox extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    changeOnKeyDown: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ checked: nextProps.value });
  }

  onChange(checked) {
    this.setState({ checked });
    this.props.onChange(checked);
  }

  render() {
    const { passProps, style } = this.props;
    return (
      <RNECheckBox
        title={this.props.label}
        checked={this.state.checked}
        iconType="material"
        uncheckedIcon="check-box-outline-blank"
        checkedIcon="check-box"
        checkedColor={colors.primaryBlue}
        onIconPress={() => {
          this.onChange(!this.state.checked);
        }}
        onPress={() => {
          this.onChange(!this.state.checked);
        }}
        containerStyle={style.checkbox}
        textStyle={style.textStyle}
      />
    );
  }
}

export default connectStyle('ca.component.CheckBox')(CheckBox);
