/**
 * Created by Julian on 2/13/17.
 */
import React, {Component} from 'react';
import {TextInput as ShoutemInput} from '@shoutem/ui';

class TextInput extends Component {
  static propTypes = {
      onChange: React.PropTypes.func,
      onKeyDown: React.PropTypes.func,
      label: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      changeOnKeyDown: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
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

  onChange(text) {
    this.setState({value: text});
    // if (this.props.changeOnKeyDown) {
    //   this.props.onChange(event.target.value);
    // }
  }

  render() {
    return (
      <ShoutemInput
        ref='input'
        value={this.state.value}
        placeholder={this.props.label}
        disabled={this.props.disabled}
        onChangeText={(text) => this.onChange(text)}
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={() => this.props.onChange(this.state.value)}
        {...this.passProps}
      />
    )
  }
}

export default TextInput;

