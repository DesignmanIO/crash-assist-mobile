import React, { Component } from "react";
import { View, ScrollView, Heading, Subtitle, Button, Text } from "@shoutem/ui";
import { MaterialIcons } from "@expo/vector-icons";
import Meteor, { Accounts } from "react-native-meteor";
import { Constants } from "expo";
import { Alert } from "react-native";
import {NavigationActions} from 'react-navigation';

import { Form } from "../../components/FormControls";
import createAccount from "./CreateAccount.json";
import { colors } from "../../config/theme";

class CreateAccount extends Component {
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

    this.createAccount = this.createAccount.bind(this);
  }

  updateUser(params) {
    const user = { ...this.state.user, ...params };
    // console.log("update", params);
    this.setState({ user }, () => {
      // this.saveIncident();
    });
  }

  async createAccount() {
    const { email, password, optIn } = this.state.user;
    console.log(email, password, optIn);
    await new Promise(resolve => {
      if (false) {
        // This should only run when someone first logs in
        Meteor.logout(() => {
          Meteor.loginWithPassword(email, password, error => {
            if (!error) {
              Meteor.call("CheckDuplicateAccountByDevice", Constants.deviceId);
              // navigator.replacePage({component: Landing, props: {key: "landing"}})
              // notify.show('Logged in successfully', 'success');
            } else {
              setState({ loginError: error.reason });
            }
          });
        });
      } else {
        Meteor.call("setEmailAddress", email, optIn, emailErr => {
          if (!emailErr) {
            console.log("succeeded setting email address");
            Accounts.changePassword(
              Meteor.user().username,
              password,
              passErr => {
                if (!passErr) {
                  console.log("yay, succeeded setting password!");
                  Alert.alert("Success", "Email and password successfully set");
                  resolve(true);
                } else {
                  console.log("boo, error!", passErr);
                  Alert.alert(
                    "Error",
                    `Problem creating the user account: ${passErr.reason}`
                  );
                  this.setState({ loginError: passErr.reason });
                  resolve(false);
                }
              }
            );
            // notify.show('Information updated', 'success');
          } else {
            console.log("boo, error!", emailErr);
            Alert.alert(
              "Error",
              `Problem setting the email address: ${emailErr.reason}`
            );
            resolve(false);
            this.setState({ loginError: emailErr.reason });
          }
        });
      }
    });
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: "MainDrawer"})]
    }));
  }

  render() {
    return (
      <View styleName="fill-parent vertical space-around">
        <Form
          doc={this.state.user}
          step={createAccount}
          updateDoc={params => this.updateUser(params)}
        />
        <View styleName="stretch md-gutter-horizontal">
          <Button
            onPress={() => {
              this.createAccount();
            }}
            styleName="primary bright dark"
          >
            <Text styleName="bright">
              Create Account
            </Text>
          </Button>
          <Button
            onPress={() => {
              console.log("done!");
            }}
          >
            <Text>
              Skip
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default CreateAccount;
