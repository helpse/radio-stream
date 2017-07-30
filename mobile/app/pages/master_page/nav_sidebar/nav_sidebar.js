import loggerCreator from "app/utils/logger";
//noinspection JSUnresolvedVariable
var moduleLogger = loggerCreator("NavSidebar");

import React, { Component } from "react";
import { Image, StyleSheet, Text, View, Platform } from "react-native";
import { observer } from "mobx-react";

import { masterStore } from "app/stores/master_store";
import { colors } from "app/styles/styles";
import NavSidebarMenuItem from "./nav_sidebar_menu_item";
import NavSidebarMenuTitle from "./nav_sidebar_menu_title";
import BackHandler from "app/utils/back_handler/back_handler";
import { player } from "app/stores/player/player";

import playIcon from "app/images/play.png";
import pencilIcon from "app/images/pencil-icon.png";
import { playlistsStore } from "app/stores/playlists_store";
import { navigator } from "app/stores/navigator.js";

const WIDTH = 336;
const OPEN_LEFT = -2;
const CLOSED_LEFT = OPEN_LEFT - WIDTH;

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    backgroundColor: colors.CONTAINER_BACKGROUND_NORMAL,
    top: 54,
    bottom: -1,
    width: WIDTH,
    borderColor: colors.CYAN_BRIGHT,
    borderStyle: "solid",
    borderWidth: 1,
    borderTopRightRadius: 5,
  },
});

@observer
export default class NavSidebar extends Component {
  async componentWillMount() {}

  onPlaylistPress = async playlistName => {
    await player.changePlaylist(playlistName);
    player.play();
    navigator.navigateToPlayer();
    masterStore.closeSidebars();
  };

  onPlaylistEditPress = playlist => {
    navigator.navigateToSearch(playlist.query, playlist.name);
  };

  onPlayerPress = () => {
    masterStore.closeSidebars();
    navigator.navigateToPlayer();
  };

  onSearchPress = () => {
    masterStore.closeSidebars();
    navigator.navigateToSearch();
  };

  onSettingsPress = () => {
    masterStore.closeSidebars();
    navigator.navigateToSettings();
  };

  onExitPress = () => {
    loggerCreator("onExitPress", moduleLogger);

    player.stopPlayer();
    BackHandler.exitApp();
  };

  render() {
    loggerCreator(this.render.name, moduleLogger);

    const left = masterStore.isNavigationSidebarOpen ? OPEN_LEFT : CLOSED_LEFT;

    return (
      <View style={[styles.sidebar, { left: left }]}>
        <NavSidebarMenuTitle text="Radio Stream" />
        <NavSidebarMenuItem text="Player" leftImage={playIcon} onPress={this.onPlayerPress} />
        <NavSidebarMenuItem text="Search" leftImage={playIcon} onPress={this.onSearchPress} />
        <NavSidebarMenuItem text="Settings" leftImage={playIcon} onPress={this.onSettingsPress} />
        {Platform.OS !== "web"
          ? <NavSidebarMenuItem text="Exit" leftImage={playIcon} onPress={this.onExitPress} />
          : null}
        <NavSidebarMenuTitle text="Playlists" />
        {playlistsStore.playlists.map(playlist =>
          <NavSidebarMenuItem
            key={playlist.name}
            text={playlist.name}
            leftImage={playIcon}
            rightImage={pencilIcon}
            onPress={() => this.onPlaylistPress(playlist.name)}
            onRightImagePress={() => this.onPlaylistEditPress(playlist)}
          />
        )}
      </View>
    );
  }
}

NavSidebar.propTypes = {};