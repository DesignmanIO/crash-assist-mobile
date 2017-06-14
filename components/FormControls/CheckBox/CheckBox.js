/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import { TextInput as ShoutemInput } from "@shoutem/ui";
import { CheckBox as RNECheckBox } from "react-native-elements";
import {colors} from '../../../config/theme';

class CheckBox extends Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    label: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    changeOnKeyDown: React.PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({ checked: nextProps.value });
  }

  onChange(checked) {
    this.setState({ checked });
    this.props.onChange(checked);
  }

  render() {
    const { passProps } = this.props;
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
        style={{ height: 55}}
      />
    );
  }
}

export default CheckBox;
