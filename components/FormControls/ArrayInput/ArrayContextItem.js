import React from 'react';
import PropTypes from 'prop-types';
import {View} from '@shoutem/ui';

const propTypes = {
  children: PropTypes.any,
  index: PropTypes.number.isRequired,
  fieldName: PropTypes.string.isRequired
}

const childContextTypes = {
  parentFieldName: PropTypes.string
}

export default class ArrayContextItem extends React.Component {
  getChildContext() {
    return {
      parentFieldName: `${this.props.fieldName}.${this.props.index}`
    }
  }

  render() {
    return (
      <View>
        {this.props.children}
      </View>
    )
  }
}

ArrayContextItem.propTypes = propTypes
ArrayContextItem.childContextTypes = childContextTypes