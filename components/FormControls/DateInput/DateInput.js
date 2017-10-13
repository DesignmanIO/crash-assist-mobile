/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from "@shoutem/ui";
import TextInput from "../TextInput";
import DatePicker from "react-native-modal-datetime-picker";
import moment from "moment";

class DateInput extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    changeOnKeyDown: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      showPicker: false,
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    return (
      <View>
        <DatePicker
          isVisible={this.state.showPicker}
          mode="date"
          onConfirm={date => {
            this.setState({
              value: moment(date).format("ddd, M/D/YYYY"),
              showPicker: false,
            }, () => {
              this.props.onChange(this.state.value);
            });
          }}
          onCancel={() => this.setState({ showPicker: false })}
        />
        <TouchableOpacity onPress={() => this.setState({ showPicker: true })}>
          <View pointerEvents="none">
            <TextInput
              inputRef={input => this.input = input}
              value={this.state.value}
              label={this.props.label}
              editable={false}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default DateInput;
