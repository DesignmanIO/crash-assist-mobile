/**
 * Created by Julian on 2/13/17.
 */
import React, { PropTypes, Component } from "react";
import TextInput from "../TextInput";
import hoistNonReactStatic from "hoist-non-react-statics";

class TextareaInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 55
    };
  }
  render() {
    const { height } = this.state;
    return (
      <TextInput
        height={height}
        multiline={true}
        onContentSizeChange={event => {
          this.setState({ height: event.nativeEvent.contentSize.height });
        }}
      />
    );
  }
}

export default hoistNonReactStatic(TextareaInput, TextareaInput);
