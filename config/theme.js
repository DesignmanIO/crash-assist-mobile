/**
 * Created by Julian on 2/13/17.
 */
import { getTheme } from '@shoutem/ui';
import Constants from 'expo-constants';
import { Header } from 'react-navigation';
import { Platform } from 'react-native';

import colors from './colors';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';
const statusBarHeight = isIOS ? Constants.statusBarHeight : 0;
const navBarHeight = Header.HEIGHT + 20; // isIOS ? 44 : 56;
const constants = {
  isIOS,
  isAndroid,
  statusBarHeight,
  navBarHeight,
};

const theme = {
  ...getTheme(),
  'shoutem.ui.Button': {
    ...getTheme()['shoutem.ui.Button'],
    '.primary': {
      backgroundColor: colors.primaryBlue,
      'shoutem.ui.Text': {
        color: colors.white,
      },
    },
  },
  'shoutem.ui.Heading': {
    ...getTheme()['shoutem.ui.Heading'],
    color: colors.primaryBlue,
  },
  'ca.component.MenuIcon': {
    fontSize: 24,
    paddingRight: 15,
  },
  'ca.view.Home': {
    wrapper: {
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    header: {
      fontSize: 20,
    },
    incidentButton: {
      backgroundColor: colors.primaryBlue,
      borderWidth: 0,
      borderRadius: 0,
      alignSelf: 'stretch',
    },
  },
  'ca.view.Incident': {},
  'ca.component.ArrayInput': {
    addButton: {
      backgroundColor: colors.primaryBlue,
      borderRadius: 3,
    },
    addButtonIcon: {
      color: colors.white,
      fontSize: 20,
    },
    addButtonText: {
      color: colors.white,
      fontSize: 14,
    },
  },
  'ca.component.TextInput': {
    input: {
      borderColor: colors.lightGrey,
      borderWidth: 0.5,
      borderRadius: 3,
      marginBottom: 20,
      paddingLeft: 10,
      fontSize: 15,
      fontWeight: 'normal',
      fontFamily: 'Rubik-Regular',
    },
  },
  'ca.component.PhotoInput': {
    touch: {
      flex: 0,
    },
    wrapper: {
      marginBottom: 20,
    },
    innerWrapper: {
      backgroundColor: colors.white,
      height: 80,
      width: 80,
      borderRadius: 3,
      borderWidth: 1,
      borderStyle: 'dashed',
      borderColor: colors.grey,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    icon: {
      color: colors.grey,
      fontSize: 20,
      textAlign: 'center',
    },
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'transparent',
    },
    label: {
      paddingLeft: 20,
      flex: 1,
    },
  },
  'ca.component.CheckBox': {
    checkbox: {
      marginHorizontal: 0,
      padding: 5,
      marginVertical: 5,
      borderWidth: 0.5,
      borderColor: colors.lightGrey,
      borderRadius: 3,
    },
    textStyle: {
      margin: 0,
      paddingHorizontal: 5,
      flex: 1,
    },
  },
};

export { colors, constants };
export default theme;
