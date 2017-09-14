import React, { Component } from "react";
import {View, ScrollView, Heading, Subtitle, Button, Text} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Meteor, {Accounts} from 'react-native-meteor';
import { Constants } from "expo";

import { Form } from "../../components/FormControls";
import createAccount from './CreateAccount.json';

class IncidentComplete extends Component {
  static navigationOptions = {
    headerVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        confirmPassword: '',
        optIn: true,
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

  createAccount() {
        const {email, password, optIn} = this.state.user;
        console.log(email, password, optIn);

        if (false) {
          // This should only run when someone first logs in
          Meteor.logout(()=> {
            Meteor.loginWithPassword(email, password, (error)=> {
              if (!error) {
                Meteor.call("CheckDuplicateAccountByDevice", Constants.deviceId)
                // navigator.replacePage({component: Landing, props: {key: "landing"}})
                // notify.show('Logged in successfully', 'success');
              } else {
                setState({loginError: error.reason});
              }
            });
          });
        } else {
          Meteor.call("setEmailAddress", email, optIn, (error)=> {
            if (!error) {
              Accounts.changePassword(Meteor.user().username, password, (error)=> {
                if (!error) {
                  console.log('yay, succeeded setting password!');
                } else {
                  console.log('boo, error!', error);
                  this.setState({loginError: error.reason});
                }
              });
              // notify.show('Information updated', 'success');
              console.log('succeeded setting email address');
            } else {
              console.log('boo, error!', error);
              this.setState({loginError: error.reason});
            }
          });
        }
    }

  render() {
    return (
      <ScrollView>
        <View>
          <Icon name="thumb-up"/>
          <Heading>All Done!</Heading>
          <Subtitle>Great job, we knew you could do it!</Subtitle>
        </View>
        <Form 
          doc={this.state}
          step={createAccount}
          updateDoc={(params) => this.updateUser(params)}
        />
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
            console.log('done!');
          }}
        >
          <Text>
            Skip
          </Text>
        </Button>
      </ScrollView>
    )
  }
}

export default IncidentComplete;
