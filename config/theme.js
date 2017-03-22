/**
 * Created by Julian on 2/13/17.
 */
import {getTheme} from '@shoutem/ui';
import colors from './colors';

const theme = {
  ...getTheme(),
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
  },
};

export {colors};
export default theme;
