import React from "react";

import Router from '../router/Router';
let Link = Router.Link;

let GameThumbnail = React.createClass({

  propTypes: {

    game: React.PropTypes.object.isRequired

  },

  render: function() {
    return (
      <Link to="gamePage" params={{gameId: this.props.game.id}} className="game-thumbnail pure-u-1-4">
        <img src={this.props.game.img_thumbnail}/>
        <div className="game-title">
          {this.props.game.title}
        </div>
      </Link>
    );
  }

});

module.exports = GameThumbnail;
