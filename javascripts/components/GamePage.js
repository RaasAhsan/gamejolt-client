import React from "react";
import classSet from 'react-classset';
import If from './control/If';

let WebInterface = require("../api/WebInterface");
let getGame = require("../actions/getGame");
let libraryGame = require("../actions/libraryGame");

let GamePage = React.createClass({

  getInitialState: function() {
    return {
      game: {
        header_media_item: {
          img_url: ""
        }
      },
      userRating: null,
      libraryGame: null
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGame(this.props.params.gameId), (payload) => {
      this.setState({game: payload.game, libraryGame: payload.libraryGame});
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

  render: function() {
    let headerStyle = {
      backgroundImage: 'url(' + this.state.game.header_media_item.img_url + ')'
    };

    console.log(this.state.game);

    let followClasses = classSet({
      'button-active': this.state.libraryGame != null
    });

    return (
      <div className="game-page">
        <div className="game-header" style={headerStyle}>
        </div>
        <div className="game-info">
          <div>
            <button className={followClasses} onClick={this.setFollowStatus}>
              <If test={this.state.libraryGame != null}><span><i className="ion-eye-disabled"></i> unfollow game</span></If>
              <If test={this.state.libraryGame == null}><span><i className="ion-eye"></i> follow game</span></If>
            </button>
          </div>
          <div className="game-about pure-u-3-4" dangerouslySetInnerHTML={{__html: this.state.game.description_compiled}}>

          </div>
        </div>
      </div>
    );
  }

});

module.exports = GamePage;
