import loggerCreator from '../../utils/logger'
//noinspection JSUnresolvedVariable
var moduleLogger = loggerCreator("PlayerLoadingSpinner");

import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, ActivityIndicator, } from 'react-native';

import player from '../../stores/player/player'

const styles = StyleSheet.create({
  // Progress
  progressSpinner: {
    justifyContent: "flex-end",
    paddingBottom: 10,
    flex: 1,
  },
  progressStatus: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  progressStatusError: {
    color: "red"
  }
});

export default class PlayerLoadingSpinner extends Component {

  render() {

    const song = this.props.song
    let loadingStatus = "Loading";
    if (song && song.title) {
      loadingStatus = `${loadingStatus}: ${song.artist} - ${song.title}`
    }

    let loadingError = "";
    if (player.loadingError) {
      loadingError = `Error occurred, retrying: ${player.loadingError}`
    }


    return (
      <View>
        <View style={styles.progressSpinner}>
          <ActivityIndicator size="large"/>
        </View>
        <View style={styles.progressStatus}>
          <Text>{loadingStatus}</Text>
          <Text style={styles.progressStatusError}>{loadingError}</Text>
        </View>
      </View>
    );
  }
}

PlayerLoadingSpinner.propTypes = {
  song: React.PropTypes.object,
};