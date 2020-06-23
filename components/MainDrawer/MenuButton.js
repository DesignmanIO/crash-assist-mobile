import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { colors, constants } from "../../config/theme";

const MenuButton = props => (
  <MaterialIcons
    onPress={() => props.navigation.toggleDrawer()}
    name="menu"
    color={colors.primaryBlue}
    size={22}
    style={{
      position: "absolute",
      top: constants.statusBarHeight + 20,
      right: 20,
      zIndex: 1
    }}
  />
);

export default MenuButton;
