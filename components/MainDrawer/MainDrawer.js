/**
 * Created by Julian on 2/13/17.
 */
import React from 'react';
import {DrawerNavigator} from 'react-navigation';
import {TouchableOpacity, Text} from '@shoutem/ui';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from '../../views/Home';
import PastIncidents from '../../views/PastIncidents';
import NewIncident from '../../views/NewIncident';
import Theme from '../../config/theme';
const menuStyle = Theme['ca.component.MenuIcon'];

const MainDrawer = DrawerNavigator({
  Home: {screen: Home},
  PastIncidents: {screen: PastIncidents},
  NewIncident: {screen: NewIncident},
}, {
  navigationOptions: {
    header({navigate}) {
      return {
        title: 'Crash Assist',
        right: (
          <TouchableOpacity onPress={() => {navigate("DrawerOpen")}}>
            <Icon name="menu" style={menuStyle}/>
          </TouchableOpacity>
        ),
      };
    },
  },
  drawerPosition: 'right',
  contentOptions: {
    style: {
    },
  },
});

export default MainDrawer;
