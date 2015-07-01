import React from "react";

import Router from '../router/Router';
let Link = Router.Link;

import If from './control/If';

let GameThumbnail = React.createClass({

  propTypes: {

    game: React.PropTypes.object.isRequired

  },

  render: function() {
    return (
      <Link to="gamePage" params={{gameId: this.props.game.id}} className="game-thumbnail pure-u-1-4">
        <div className="game-thumbnail-image">
          <img className="game-image" src={this.props.game.img_thumbnail}/>
          <img className="developer-avatar" src={this.props.game.developer.img_avatar}/>
        </div>
        <div className="game-platforms">
          <If test={this.props.game.compatibility.os_windows != null}><i className="ionicons ion-social-windows"></i></If>
          <If test={this.props.game.compatibility.os_mac != null}><i className="ionicons ion-social-apple"></i></If>
          <If test={this.props.game.compatibility.os_linux != null}><i className="ionicons ion-social-tux"></i></If>
        </div>
        <div className="game-title">
          {this.props.game.title}
        </div>
        <div className="game-author">
          {this.props.game.developer.display_name}
        </div>
      </Link>
    );
  }

});

module.exports = GameThumbnail;
