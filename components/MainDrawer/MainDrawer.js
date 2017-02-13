/**
 * Created by Julian on 2/13/17.
 */
import {DrawerNavigator} from 'react-navigation';

import Home from '../../views/Home';
import PastIncidents from '../../views/PastIncidents';
import NewIncident from '../../views/NewIncident';

const MainDrawer = DrawerNavigator({
  Home: {screen: Home},
  PastIncidents: {screen: PastIncidents},
  NewIncident: {screen: NewIncident},
}, {
  drawerPosition: 'right',
  contentOptions: {
    style: {
    }
  },
});

export default MainDrawer;
