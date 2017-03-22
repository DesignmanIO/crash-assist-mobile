/**
 * Created by Julian on 2/13/17.
 */
import React, {Component, PropTypes} from 'react';
import {TextInput as ShoutemInput, View} from '@shoutem/ui';
import DatePicker from 'react-native-modal-datetime-picker';

class DateInput extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    changeOnKeyDown: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
      value: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  onKeyDown(event) {
    if (event.keyCode === 13) {
      this.props.onChange(this.state.value);
    }
  }

  onChange(event) {
    this.setState({value: event.target.value});
    if (this.props.changeOnKeyDown) {
      console.log('changed');
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <View>
        <DatePicker
          isVisible={this.state.showPicker}
          onConfirm={(date) => this.setState({value: date,})}
          onCancel={() => this.setState({showPicker: false})}
        />
        <ShoutemInput
          ref='input'
          value={this.state.value || ''}
          placeholder={this.props.label}
          disabled={this.props.disabled}
          onPress={() => this.setState({showPicker: true})}
          onChange={this.onChange.bind(this)}
          onKeyDown={this.onKeyDown.bind(this)}
          onBlur={() => this.props.onChange(this.state.value)}
          {...this.passProps}
        />
      </View>
    )
  }
}

export default DateInput;
