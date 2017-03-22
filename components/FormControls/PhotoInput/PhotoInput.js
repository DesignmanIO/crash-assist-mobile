/**
 * Created by Julian on 2/13/17.
 */
import React, {Component, PropTypes} from 'react';
import {TextInput as ShoutemInput} from '@shoutem/ui';

class PhotoInput extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    changeOnKeyDown: PropTypes.func,
    disabled: PropTypes.bool,
    styleName: PropTypes.string,
  }

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

  onChange(event) {
    this.setState({value: event.target.value});
    if (this.props.changeOnKeyDown) {
      console.log('changed');
      this.props.onChange(event.target.value);
    }
  }

  render() {
    return (
      <ShoutemInput
        ref='input'
        value={this.state.value || ''}
        placeholder={this.props.label}
        disabled={this.props.disabled}
        onChange={this.onChange.bind(this)}
        onKeyDown={this.onKeyDown.bind(this)}
        onBlur={() => this.props.onChange(this.state.value)}
        styleName={this.props.styleName}
        {...this.passProps}
      />
    )
  }
}

export default PhotoInput;
