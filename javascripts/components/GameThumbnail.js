import React from "react";

import Router from '../router/Router';
let Link = Router.Link;

let GameThumbnail = React.createClass({

  propTypes: {

    game: React.PropTypes.object.isRequired

  },

  getInitialState: function() {
    return {
      game: this.props.game
    };
  },

  render: function() {
    return (
      <Link to="gamePage" params={{gameId: this.state.game.id}} className="game-thumbnail pure-u-1-4">
        <img src={this.state.game.img_thumbnail}/>
        <div className="game-title">
          {this.state.game.title}
        </div>
      </Link>
    );
  }

});

module.exports = GameThumbnail;
