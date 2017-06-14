import React, { Component, PropTypes } from "react";
import { View, TouchableOpacity, Caption, Image, Spinner } from "@shoutem/ui";
import { connectStyle } from "@shoutem/theme";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ImagePicker } from "expo";
import { connectActionSheet } from "@expo/react-native-action-sheet";

import renderIf from "../../../lib/renderIf";
import { colors } from "../../../config/theme";
import cloudinaryConfig from "../../../config/cloudinaryConfig";

class PhotoInput extends Component {
  static propTypes = {
    style: PropTypes.object,
    imageUri: PropTypes.string,
    aspectRatio: PropTypes.array
    // size: PropTypes.number,
    // transparent: PropTypes.boolean,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasImage: false,
      imageUri: props.imageUri || undefined,
      uploading: false
    };
  }

  async uploadPhoto({ choice }) {
    const { onChange, aspectRatio } = this.props;
    this.setState({ uploading: true });
    let image;
    const options = { allowsEditing: true, aspect: aspectRatio || [1, 1] };
    if (choice === 2) return false;
    if (choice === 0) {
      image = await ImagePicker.launchCameraAsync(options);
    } else if (choice === 1) {
      image = await ImagePicker.launchImageLibraryAsync(options);
    }
    const data = cloudinaryConfig.getRequestParams({
      uri: image.uri,
      name: "LeagueIcon.jpg"
    });
    const response = await fetch(cloudinaryConfig.imageUploadUri, {
      method: "Post",
      body: data
    });
    const imageData = await response.json();
    this.setState({ imageUri: imageData.secure_url, loading: false });
    onChange([imageData.secure_url]);
    // console.log(image, cloudinaryConfig.getRequestParams({uri: image.uri, name: image.name}));
  }

  render() {
    const { style, onChange, children } = this.props;
    return (
      <TouchableOpacity
        style={style.touch}
        onPress={() => {
          if (this.state.imageUri) {
            //allow removing Photo
            this.props.showActionSheetWithOptions(
              {
                options: [
                  "Delete Photo",
                  "Take a new photo",
                  "Upload a new Photo",
                  "Cancel"
                ],
                destructiveButtonIndex: 0,
                cancelButtonIndex: 3,
                tintColor: colors.primaryBlue
              },
              buttonIndex => {
                if (buttonIndex === 0) {
                  this.setState({ imageUri: undefined, uploading: false });
                  onChange([]);
                }
                if (buttonIndex === 1) this.uploadPhoto({ choice: 0 });
                if (buttonIndex === 2) this.uploadPhoto({ choice: 1 });
              }
            );
            return false;
          }
          this.props.showActionSheetWithOptions(
            {
              options: ["Take a Photo", "Upload from Library", "Cancel"],
              cancelButtonIndex: 2,
              destructiveButtonIndex: -1,
              title: "Take or upload a photo",
              tintColor: colors.primaryBlue
            },
            buttonIndex => {
              if (buttonIndex === 2) return false;
              this.uploadPhoto({ choice: buttonIndex });
            }
          );
        }}
      >
        {renderIf(
          children,
          () => <View>{children}</View>,
          () => (
            <View style={style.wrapper} styleName="vertical">
              {renderIf(
                this.state.uploading,
                () => <Spinner />,
                () => (
                  <View>
                    <Icon name="camera-alt" style={style.icon} size={50} />
                    <Caption>Add photo</Caption>
                  </View>
                )
              )}
              <Image
                source={{ uri: this.state.imageUri }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "transparent"
                }}
              />
            </View>
          )
        )}
      </TouchableOpacity>
    );
  }
}

export default connectStyle("ca.component.PhotoInput", {})(
  connectActionSheet(PhotoInput)
);
