import React from 'react';

let InstalledGame = React.createClass({

  openGame: function(){
    openGame(this.props.game.location);
  },

  openFolder: function(){
    openGameFolder(this.props.game.location);
  },

  render: function() {
    return (
      <div className="installed-game">
        <span className="release-title">{this.props.game.name}</span>
        <span className="release-version">version {this.props.game.version}</span>
        <div className="installed-actions">
          <button onClick={this.openGame}><i className="ionicons ion-ios-game-controller-b"></i> play game</button>
          <button onClick={this.openFolder}><i className="ionicons ion-folder"></i> open game folder</button>
          <button onClick={this.props.uninstall}><i className="ionicons ion-android-close"></i> uninstall</button>
        </div>
      </div>
    );
  }

});

module.exports = InstalledGame;
