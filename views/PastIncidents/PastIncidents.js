/**
 * Created by Julian on 2/13/17.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  View,
  Button,
  Text,
  Divider,
  TouchableOpacity,
  TextInput,
  Caption
} from "@shoutem/ui";
import { FlatList } from "react-native";
import Meteor, { withTracker } from "react-native-meteor";
import { connectStyle } from "@shoutem/theme";
import hoistStatics from "hoist-non-react-statics";
import { MaterialIcons } from "@expo/vector-icons";

import Store from "../../redux";
import { MenuButton } from "../../components/MainDrawer";
import { renderIf } from "../../lib";
import { colors } from "../../config/theme";

class PastIncidents extends Component {
  static navigationOptions = {
    title: "Past Incidents",
    drawerLabel: "Past Incidents"
  };

  constructor(props) {
    super(props);

    this.state = {
      editTitleById: "",
      editTitle: ""
    };
  }

  render() {
    let { navigation, style, pastIncidents } = this.props;
    const { editTitleById, editTitle } = this.state;
    // console.log(pastIncidents, Meteor.userId(), this.props.loading);
    return (
      <View
        style={style.wrapper}
        styleName="xl-gutter-top md-gutter-horizontal"
      >
        <MenuButton navigation={this.props.navigation} />
        <View
          styleName="sm-gutter"
          style={{
            borderColor: colors.primaryBlue,
            borderWidth: 1,
            borderRadius: 3,
            marginVertical: 15
          }}
        >
          <Caption>
            Tap an incident to edit it, tap and hold to edit the title.
          </Caption>
        </View>
        <Divider styleName="line" />
        <FlatList
          data={pastIncidents}
          ItemSeparatorComponent={() => <Divider styleName="line" />}
          keyExtractor={item => item._id}
          renderItem={({ item: incident }) => (
            <View styleName="horizontal space-between v-center">
              <View styleName="md-gutter-vertical flexible">
                <TouchableOpacity
                  onPress={() => {
                    const incidentId = incident._id;
                    Store.dispatch({ type: "SET_INCIDENTID", incidentId });
                    navigation.navigate("Incident", { incidentId });
                  }}
                  onLongPress={() =>
                    this.setState({ editTitleById: incident._id })}
                >
                  {renderIf(
                    incident._id === editTitleById,
                    () => (
                      <TextInput
                        style={{ flex: 1, padding: 0, height: 40 }}
                        placeholder={incident.title}
                        onChangeText={text =>
                          this.setState({ editTitle: text })}
                        onSubmitEditing={() => {
                          console.log("updating title to ", editTitle);
                          this.setState({ editTitleById: "" });
                          Meteor.collection("incidents").update(incident._id, {
                            $set: { title: editTitle }
                          });
                        }}
                        autoFocus
                      />
                    ),
                    () => <Text>{incident.title}</Text>
                  )}
                </TouchableOpacity>
              </View>
              {/* <Button
                onPress={() => this.setState({ editTitleById: incident._id })}
                style={{ padding: 7, borderRadius: 22 }}
                styleName="primary tight"
              >
                <MaterialIcons name="edit" color="white" size={15} />
              </Button> */}
            </View>
          )}
        />
      </View>
    );
  }
}

PastIncidents.propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object
};

export default (PastIncidentsContainer = hoistStatics(
  withTracker(() => {
    const pastIncidentsHandle = Meteor.subscribe("PastIncidents");
    const loading = !pastIncidentsHandle.ready();
    const pastIncidents = Meteor.collection("incidents").find({
      completed: true
    });
    // console.log(pastIncidentsHandle, pastIncidents);

    return {
      pastIncidentsHandle,
      loading,
      pastIncidents
    };
  })(connectStyle("ca.views.PastIncidents", {})(PastIncidents)),
  PastIncidents
));
