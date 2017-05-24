import loggerCreator from '../../utils/logger'
//noinspection JSUnresolvedVariable
var moduleLogger = loggerCreator("PlayerContextMenu");

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import {Menu, MenuOptions, MenuOption, MenuTrigger} from '../../shared_components/context_menu/context_menu';
import {colors} from '../../styles/styles'

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    right: 0,
    top: -5
  },
  menuTrigger: {
    paddingRight: 20,
    fontSize: 25,
    fontWeight: "bold",
    color: colors.CYAN_BRIGHT.rgbString(),
  },
});

const menuOptionsCustomStyles = {
  OptionTouchableComponent: TouchableHighlight,
  optionsWrapper: {
    backgroundColor: colors.CYAN_DARKEST,
    borderColor: colors.CYAN_BRIGHT.rgbString(),
    borderStyle: "solid",
    borderWidth: 1,
  },
  optionTouchable: {
    activeOpacity: 1,
    underlayColor: colors.CYAN_DARK.rgbaString(),
  },
  optionText: {
    color: colors.CYAN_BRIGHT.rgbString(),
    padding: 10,
    textAlign: "center",
  },
}


export default class PlayerContextMenu extends Component {

  render() {
    return (
      <Menu style={styles.menu}>
        <MenuTrigger>
          <Text style={styles.menuTrigger}>&#8942;</Text>
        </MenuTrigger>
        <MenuOptions customStyles={menuOptionsCustomStyles}>
          <MenuOption onSelect={(value) => alert(`User selected the number 1`)} text="Clear rating"/>
          <MenuOption onSelect={(value) => alert(`User selected the number 1`)} text="Delete song"/>
        </MenuOptions>
      </Menu>
    );
  }
}