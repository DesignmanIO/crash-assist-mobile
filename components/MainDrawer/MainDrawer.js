/**
 * Created by Julian on 2/13/17.
 */
import React from "react";
import { createDrawerNavigator } from "react-navigation";
import { TouchableOpacity, Text } from "@shoutem/ui";
import Icon from "react-native-vector-icons/MaterialIcons";

import Home from "../../views/Home";
import PastIncidents from "../../views/PastIncidents";
import Incident from "../../views/Incident";
// import theme from '../../config/theme';

const MainDrawer = createDrawerNavigator(
  {
    Home: { screen: Home },
    PastIncidents: { screen: PastIncidents },
    Incident: { screen: Incident },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "white",
        shadowOpacity: 0
      }
    },
    headerMode: "screen",
    drawerPosition: "right",
    contentOptions: {
      style: {}
    }
  }
);

MainDrawer.navigationOptions = {
  header: null,
};

export default MainDrawer;
