import loggerCreator from "../../utils/logger";
//noinspection JSUnresolvedVariable
var moduleLogger = loggerCreator("Sidebar");

import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";

import masterStore from "../../stores/master_store";
import { colors } from "../../styles/styles";
import SidebarMenuItem from "./sidebar_menu_item";

import playIcon from "../../images/play-icon.png";

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    backgroundColor: colors.CONTAINER_BACKGROUND_NORMAL,
    top: 59,
    bottom: -1,
    left: -2,
    borderColor: colors.CYAN_BRIGHT,
    borderStyle: "solid",
    borderWidth: 1,
    borderTopRightRadius: 5,
  },
});

OPEN_WIDTH = 336;
CLOSED_WIDTH = -1;

@observer
export default class Sidebar extends Component {
  render() {
    loggerCreator(this.render.name, moduleLogger);

    const width = masterStore.isNavigationSidebarOpen ? OPEN_WIDTH : CLOSED_WIDTH;

    return (
      <View style={[styles.sidebar, { width: width }]}>
        <SidebarMenuItem text="Player" image={playIcon} />
        <SidebarMenuItem text="Player" image={playIcon} />
      </View>
    );
  }
}

Sidebar.propTypes = {};