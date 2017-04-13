import Exponent, { Font } from 'exponent';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider } from '@shoutem/theme';
import { Spinner } from '@shoutem/ui';
import { combineReducers, createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import Meteor from 'react-native-meteor';

import {appState} from './config/redux';
import MainDrawer from './components/MainDrawer';
import theme from './config/theme';
import renderIf from './lib/renderIf';

Meteor.connect('wss://crashassistapp.com/websocket');

const AppNavigator = StackNavigator({
  MainDrawer: { screen: MainDrawer },
}, {
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: 'white',
      paddingTop: 10,
    },
  });

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return (newState ? newState : state)
};

const appReducer = combineReducers({
  appState,
  nav: navReducer,
});

const Store = createStore(appReducer);

@connect(({ nav, appState }) => {
  return { nav, appState };
})
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Rubik': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf'),
      'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf')
    });
    this.setState({ loaded: true });
  }

  render() {
    return (
      <StyleProvider style={theme}>
        {
          renderIf(this.state.loaded,
            () => {
              return <AppNavigator ref={nav => { this.navigator = nav }} />;
            },
            () => {
              return <Spinner />;
            })
        }
      </StyleProvider>
    );
  }
}

export { AppNavigator, Store };

const AppWithRedux = (props) => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  )
};

Exponent.registerRootComponent(AppWithRedux);
