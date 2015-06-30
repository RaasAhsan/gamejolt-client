import React from "react";
import classSet from 'react-classset';
import If from './control/If';

let WebInterface = require("../api/WebInterface");
let getGame = require("../actions/getGame");
let libraryGame = require("../actions/libraryGame");

let Package = require('./game/Package');
let Soundtrack = require('./game/Soundtrack');

let GamePage = React.createClass({

  getInitialState: function() {
    return {
      game: {
        header_media_item: {
          img_url: ""
        }
      },
      userRating: null,
      libraryGame: null,
      overview: {
        packages: [],
        releases: [],
        builds: [],
        songs: []
      }
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGame.general(this.props.params.gameId), (p1) => {
      new WebInterface().makeRequest(getGame.overview(this.props.params.gameId), (p2) => {
        this.setState({game: p1.game, libraryGame: p1.libraryGame, overview: p2});
      });
    });
  },

  setFollowStatus: function(){
    if(this.state.libraryGame) {
      new WebInterface().makeRequest(libraryGame.removeGame(this.state.game.id), (payload) => {
        this.setState({libraryGame: null});
      });
    } else {
      new WebInterface().makeRequest(libraryGame.addGame(this.state.game.id), (payload) => {
        this.setState({libraryGame: payload.gameLibraryGame});
      });
    }
  },

  getReleasesForPackage: function(packageId){
    return this.state.overview.releases.filter((release) => {return release.game_package_id == packageId});
  },

  getBuildsForRelease: function(releaseId){
    return this.state.overview.builds.filter((build) => {return build.game_release_id == releaseId});
  },

  render: function() {
    let headerStyle = {
      backgroundImage: 'url(' + this.state.game.header_media_item.img_url + ')'
    };

    let followClasses = classSet({
      'button-active': this.state.libraryGame != null
    });

    let packages = this.state.overview.packages.map((p, i) => {
      let latest = this.getReleasesForPackage(p.id)[0];
      let builds = this.getBuildsForRelease(latest.id);

      return (
        <Package key={i} game={this.state.game} package={p} release={latest} builds={builds}/>
      );
    });

    return (
      <div className="game-page">
        <div className="game-header" style={headerStyle}>
        </div>
        <div className="game-info">
          <div className="game-actions">
            <button className={followClasses} onClick={this.setFollowStatus}>
              <If test={this.state.libraryGame != null}><span><i className="ion-eye-disabled"></i> unfollow game</span></If>
              <If test={this.state.libraryGame == null}><span><i className="ion-eye"></i> follow game</span></If>
            </button>
          </div>
          <div>
            <div className="game-about pure-u-15-24">
              <div className="game-section-title">Game Description</div>
              <div className="game-description" dangerouslySetInnerHTML={{__html: this.state.game.description_compiled}}>
              </div>
            </div>

            <div className="game-files pure-u-9-24">
              {packages}
              <If test={this.state.overview.songs.length > 0}>
                <Soundtrack tracks={this.state.overview.songs}/>
              </If>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = GamePage;
