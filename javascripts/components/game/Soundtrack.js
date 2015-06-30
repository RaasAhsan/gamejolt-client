import React from 'react';

let moment = require('moment');
let If = require('../control/If');
let classSet = require('react-classset');

let Soundtrack = React.createClass({

  getInitialState: function() {
    return {
      track: 0,
      progress: 0,
      duration: 0,
      tracks: this.props.tracks
    };
  },

  componentDidMount: function() {
    this.refs.trackPlayer.getDOMNode().onended = () => {
      this.setState({track: this.state.track == this.props.tracks.length - 1 ? 0 : this.state.track + 1});
      this.refs.trackPlayer.getDOMNode().play();
    };

    this.state.tracks.map((track, i) => {
      let trackAudio = document.createElement('audio');
      trackAudio.setAttribute('src', track.url);

      trackAudio.addEventListener('loadeddata', () => {
        let time = moment.duration(trackAudio.duration, 'seconds');
        let seconds = time.seconds().toString();
        if(seconds.length == 1) {
          seconds = "0" + seconds;
        }

        let currentTracks = this.state.tracks;
        currentTracks[i].time = time.minutes() + ':' + seconds;
        this.setState({tracks: currentTracks});
      });
    });
  },

  setTrack: function(trackId) {
    return () => {
      this.setState({track: trackId});
      this.refs.trackPlayer.getDOMNode().play();
    };
  },

  render: function() {
    let tracks = this.state.tracks.map((track, i) => {
      let trackClass = classSet({
        'game-track': true,
        'active-track': this.state.track == i
      });
      return (
        <div key={i} className={trackClass} onClick={this.setTrack(i)}>
          <div className="pure-u-2-24 track-number">
            {i+1}.
          </div>
          <div className="pure-u-20-24 track-title">
            {track.title}
          </div>
          <div className="pure-u-2-24 track-number">
            {track.time || '0:00'}
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="game-soundtrack">
          <div className="soundtrack-title">Game Soundtrack</div>
          <audio ref="trackPlayer" src={this.state.tracks[this.state.track].url} controls>
          </audio>
          {tracks}
        </div>
      </div>
    );
  }

});

module.exports = Soundtrack;
