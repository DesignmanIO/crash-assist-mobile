import Expo from "expo";
import * as Font from 'expo-font';
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "react-navigation";
import { StyleProvider } from "@shoutem/theme";
import { Spinner } from "@shoutem/ui";
import { Provider } from "react-redux";
import Meteor from "react-native-meteor";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import Store from './redux';
import MainDrawer from "./components/MainDrawer";
import theme from "./config/theme";
import renderIf from "./lib/renderIf";
import IncidentComplete, { CreateAccount } from "./views/IncidentComplete";

Meteor.connect("wss://crashassist.app/websocket");
// Meteor.connect("ws://localhost:3000/websocket");

const AppNavigator = createStackNavigator(
  {
    MainDrawer: { screen: MainDrawer },
    IncidentComplete: { screen: IncidentComplete },
    CreateAccount: { screen: CreateAccount }
  },
  {
    headerMode: "screen",
    cardStyle: {
      backgroundColor: "white"
      // paddingTop: 10
    }
  }
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Rubik: require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "Rubik-Regular": require("./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "Rubik-Medium": require("./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf")
    });
    this.setState({ loaded: true });
  }

  render() {
    return (
      <StyleProvider style={theme}>
        <Provider store={Store}>
          <ActionSheetProvider>
            {renderIf(
              this.state.loaded,
              () => {
                return <AppNavigator />;
              },
              () => {
                return <Spinner />;
              }
            )}
          </ActionSheetProvider>
        </Provider>
      </StyleProvider>
    );
  }
}

export { App, Store };

Expo.registerRootComponent(App);
