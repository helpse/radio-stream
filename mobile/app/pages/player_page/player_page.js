import loggerCreator from '../../utils/logger'
var moduleLogger = loggerCreator("player_page");

import React, {Component} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import BackHandler from '../../utils/back_handler/back_handler'
import {observer} from "mobx-react"

import Icon from '../../shared_components/icon'
import player from '../../stores/player/player'
import {colors, fontSizes} from '../../styles/styles'
import CircleButton from '../../shared_components/circle_button'
import Text from '../../shared_components/text'
import Rating from './rating'
import AlbumArt from './album_art'
import navigator from '../../stores/navigator/navigator'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    alignItems: "center",
    alignSelf: "stretch"
  },
  // Playlist name
  playlistNameView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 10,
    paddingTop: 5,
    paddingLeft: 5,
  },
  playlistIcon: {
    color: colors.SEMI_WHITE.rgbString(),
    marginRight: 5,
  },
  // Ratings
  rating: {
    marginBottom: 20
  },
  // Names (artist, title, album)
  namesView: {
    alignItems: "center",
  },
  nameText: {
    fontSize: fontSizes.LARGE,
    marginBottom: 2
  },
  artistText: {
    color: colors.CYAN_BRIGHT.rgbString()
  },
  // Controls
  controlsView: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 80, // Causes the play button to be in the center
  },
  controlButtonText: {
    color: colors.SEMI_WHITE.rgbString(),
    fontSize: 40
  },
  controlTextPlay: {
    paddingLeft: 10
  },
  controlTextPause: {
    paddingLeft: 0
  },
  controlButtonPlay: {
    marginRight: 20
  },
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

@observer
export default class PlayerPage extends Component {

  componentWillMount() {
    let logger = loggerCreator("componentWillMount", moduleLogger);
    logger.info(`playlist: ${this.props.playlistName}`);

    BackHandler.addEventListener('hardwareBackPress', () => this.onPressHardwareBack());
  }

  componentDidMount() {
    let logger = loggerCreator("componentDidMount", moduleLogger);
  }

  componentWillUnmount() {
    let logger = loggerCreator("componentWillUnmount", moduleLogger);
  }

  onPressPlayPause() {
    let logger = loggerCreator("onPressPlayPause", moduleLogger);

    if (player.isPlaying) {
      logger.info(`pause`);
      player.pause();
    } else {
      logger.info(`play`);
      player.play();
    }

  }

  onPressNext() {
    player.playNext();
  }

  onPressHardwareBack() {
    let logger = loggerCreator("hardwareBackPress", moduleLogger);
    player.pause();
    navigator.navigateToPlaylistCollection();
    return true;
  }

  render() {
    let logger = loggerCreator("render", moduleLogger);

    let loadingStatus = "Loading";

    const song = player.song;
    logger.info(`rendering song: ${song && song.toString()}`);

    if (song) {

      if (song.title) {
        loadingStatus = `${loadingStatus}: ${song.artist} - ${song.title}`
      }
    }

    let loadingError = "";
    if (player.loadingError) {
      loadingError = `Error occurred, retrying: ${player.loadingError}`
    }

    return (
      <View style={styles.container}>
        <View style={styles.playlistNameView}>
          <Icon name="music" style={styles.playlistIcon}/>
          <Text>{this.props.playlistName}</Text>
        </View>
        <Choose>
          <When condition={!player.isLoading}>
            {/* Album art */}
            <AlbumArt song={song} />
            {/* Ratings */}
            <Rating style={[styles.rating]} song={song}/>
            {/* Names */}
            <View style={styles.namesView}>
              <Text style={[styles.nameText, styles.titleText]}>{`${song.title}`}</Text>
              <Text style={[styles.nameText, styles.artistText]}>{`${song.artist}`}</Text>
              <Text style={[styles.nameText, styles.albumText]}>{`${song.album}`}</Text>
            </View>
            {/* Controls */}
            <View style={styles.controlsView}>
              <CircleButton size={100} onPress={() => this.onPressPlayPause()}
                            style={[styles.controlButtonPlay]}>
                <Icon name={player.isPlaying ? "pause" : "play"}
                      style={[styles.controlButtonText, player.isPlaying ? styles.controlTextPause : styles.controlTextPlay]}/>
              </CircleButton>
              <CircleButton size={60} onPress={() => this.onPressNext()}>
                <Icon name="step-forward"
                      style={styles.controlButtonText}/>
              </CircleButton>
            </View>
          </When>
          <Otherwise>
            <View style={styles.progressView}>
              <View style={styles.progressSpinner}>
                <ActivityIndicator size="large"/>
              </View>
              <View style={styles.progressStatus}>
                <Text>{loadingStatus}</Text>
                <Text style={styles.progressStatusError}>{loadingError}</Text>
              </View>
            </View>
          </Otherwise>
        </Choose>
      </View>
    );
  }
}

PlayerPage.propTypes = {
  playlistName: React.PropTypes.string.isRequired,
};