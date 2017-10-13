import React, { Component } from "react";
import { View, ScrollView, Heading, Subtitle, Button, Text } from "@shoutem/ui";
import { MaterialIcons } from "@expo/vector-icons";
import Meteor, { Accounts } from "react-native-meteor";
import { Constants } from "expo";
import _ from 'lodash';
import {NavigationActions} from 'react-navigation'

import { Form } from "../../components/FormControls";
import createAccount from "./CreateAccount.json";
import { colors } from "../../config/theme";

class IncidentComplete extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: "",
        confirmPassword: "",
        optIn: true
      }
    };
  }

  componentWillMount() {
    setTimeout(() => {
      const user = Meteor.user();

      if (user.emails &&  user.emails.length) {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: "MainDrawer"})]
        }));
      } else {
        console.log('going to create account');
        this.props.navigation.navigate("CreateAccount");
      }
    }, 3000);
  }

  render() {
    return (
      <View styleName="fill-parent md-gutter-horizontal vertical h-center space-around">
        <View styleName="vertical h-center xl-gutter-vertical">
          <MaterialIcons name="thumb-up" size={35} color={colors.green} />
          <Heading styleName="md-gutter-top sm-gutter-bottom" style={{ color: colors.green }}>
            All Done!
          </Heading>
          <Subtitle>Great job, we knew you could do it!</Subtitle>
        </View>
      </View>
    );
  }
}

export default IncidentComplete;
