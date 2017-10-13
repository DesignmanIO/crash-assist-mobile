import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import {colors} from '../../config/theme';

const MenuButton = props => (
  <MaterialIcons
    onPress={() => props.navigation.navigate("DrawerToggle")}
    name="menu"
    color={colors.primaryBlue}
    size={22}
    style={{ position: "absolute", top: 30, right: 20, zIndex: 1 }}
  />
);

export default MenuButton;
