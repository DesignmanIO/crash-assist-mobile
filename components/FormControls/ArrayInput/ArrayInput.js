/**
 * Created by Julian on 2/13/17.
 */
import React from 'react';
import {ArrayComponent} from 'simple-react-form';
import {Button, Row, Subtitle, Text, View} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/Ionicons';
// import TextInput from '../TextInput';

class ArrayInput extends ArrayComponent {
  static propTypes = {
    passProps: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  renderChildrenItem({index, children}) {
    console.log(index, children, this.context.parentFieldName);
    return (
      <Row key={`${this.props.fieldName}.${index}`}>
        <View styleName="vertical">
          <Subtitle>{`${this.props.passProps.arrayText} ${index + 1}`}</Subtitle>
          {this.renderChildrenItemWithContext({index, children})}
        </View>
        <View>
          {this.renderRemoveButton(index)}
        </View>
      </Row>
    )
  }

  renderRemoveButton(index) {
    if (this.props.disabled) return null;
    return (
      <Button onPress={() => this.removeItem(index)}>
        <Icon name="ios-trash"/>
      </Button>
    )
  }

  renderAddButton() {
    if (!this.props.showAddButton) return;
    if (this.props.disabled) return;
    return (
      <Button onPress={() => this.addItem()}>
        <Icon name="ios-add"/>
        <Text>{this.props.passProps.arrayText ? `Add ${this.props.passProps.arrayText}` : ''}</Text>
      </Button>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderChildren()}
        {this.renderAddButton()}
      </View>
    )
  }
}

export default ArrayInput;
