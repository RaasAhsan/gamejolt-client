import React from 'react';

let Package = React.createClass({

  render: function() {
    let releaseTitle = this.props.package.title || this.props.game.title;

    return (
      <div className="game-package">
        <span className="package-title">{releaseTitle}</span>
        <span className="package-version">version {this.props.release.version_number}</span>
        <div className="package-platforms">
          <i className="ionicons ion-social-windows"></i>
          <i className="ionicons ion-social-apple"></i>
          <i className="ionicons ion-social-tux"></i>
          <i className="ionicons ion-social-chrome"></i>
          <i className="ionicons ion-android-laptop"></i>
        </div>
      </div>
    );
  }

});

module.exports = Package;
