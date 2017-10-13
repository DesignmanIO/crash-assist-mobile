/**
 * Created by Julian on 2/13/17.
 */
import React from "react";
import PropTypes from 'prop-types';
import { ArrayComponent } from "simple-react-form";
import { Button, Row, Subtitle, Text, View } from "@shoutem/ui";
import Icon from "react-native-vector-icons/Ionicons";
import {connectStyle} from '@shoutem/theme';

import ArrayContextItem from './ArrayContextItem';
// import TextInput from '../TextInput';

class ArrayInput extends ArrayComponent {
  static propTypes = {
    passProps: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.addItem();
  }

  getChildrenComponents (item, index) {
    if (this.props.passProps.renderItem) return this.props.passProps.renderItem(item, index)
    if (this.props.passProps.children) return this.props.passProps.children
  }

  renderChildrenItemWithContext({index, children}) {
    return (
      <ArrayContextItem index={index} fieldName={this.props.fieldName}>
        {children}
      </ArrayContextItem>
    )
  }

  renderChildrenItem({ index, children }) {
    // console.log(index, children, this.context.parentFieldName);
    return (
      <View key={`${this.props.fieldName}.${index}`}>
        <View styleName="vertical">
          <View styleName="horizontal space-between" style={{marginBottom: 20}}>
            <Subtitle>
              {`${this.props.passProps.arrayText} ${index + 1}`}
            </Subtitle>
            {this.renderRemoveButton(index)}
          </View>
          {this.renderChildrenItemWithContext({ index, children })}
        </View>
      </View>
    );
  }

  renderRemoveButton(index) {
    if (this.props.disabled) return null;
    return (
      <Button onPress={() => this.removeItem(index)}>
        <Icon name="ios-trash" />
      </Button>
    );
  }

  renderAddButton() {
    const {style} = this.props;
    if (!this.props.showAddButton) return;
    if (this.props.disabled) return;
    return (
      <Button onPress={() => this.addItem()} style={style.addButton} styleName="full-width sm-gutter-top">
        <Icon name="ios-add" style={style.addButtonIcon} />
        <Text style={style.addButtonText}>
          {this.props.passProps.arrayText
            ? `  Add ${this.props.passProps.arrayText}`
            : ""}
        </Text>
      </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 120 }}>
        {this.renderChildren()}
        {this.renderAddButton()}
      </View>
    );
  }
}

export default connectStyle('ca.component.ArrayInput')(ArrayInput);
