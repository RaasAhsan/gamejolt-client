import React from 'react';

import assign from 'object-assign';

import StoreListener from '../mixins/StoreListener';
import DownloadStore from '../../stores/DownloadStore';

import classSet from 'react-classset';
import If from '../control/If';

let WebInterface = require("../../api/WebInterface");
let getDownload = require("../../actions/getDownload");
let notify = require("../../actions/notify");

let Progress = require('./Progress');

let Package = React.createClass({

  mixins: [StoreListener],

  statics: {
    stores: [DownloadStore]
  },

  getInitialState: function() {
    return assign(window.dispatcher.getStore(DownloadStore).getState(), {downloadOpen: false});
  },

  onChange: function() {
    this.setState(assign(window.dispatcher.getStore(DownloadStore).getState()));
  },

  openDownload: function(){
    this.setState({downloadOpen: !this.state.downloadOpen});
  },

  downloadBuild: function(build){
    return (e) => {
      if(!this.state.builds[build.id]) {
        new WebInterface().makeRequest(getDownload(build.id), (payload) => {
          let releaseTitle = this.props.package.title || this.props.game.title;

          notify('Downloading game', `${releaseTitle} is downloading.`);

          let downloadData = {
            buildId: build.id,
            downloadUrl: payload.downloadUrl,
            filename: build.primary_file.filename,
            release: releaseTitle
          };

          downloadGame(downloadData);
        });
      }
    };
  },

  installBuild: function(build){
    return (e) => {
      if(!this.state.builds[build.id]) {
        new WebInterface().makeRequest(getDownload(build.id), (payload) => {
          let releaseTitle = this.props.package.title || this.props.game.title;

          notify('Installing game', `${releaseTitle} is installing...`);

          let installData = {
            build: build,
            downloadUrl: payload.downloadUrl,
            filename: build.primary_file.filename,
            release: releaseTitle,
            releaseVersion: this.props.release.version_number
          };

          installGame(installData);
        });
      }
    };
  },

  getBuildAction: function(build){
    if(this.getPlatformAction(build) == "Install ") {
      return this.installBuild(build);
    } else {
      return this.downloadBuild(build);
    }
  },

  getPlatformAction: function(build){
    if(build[getPlatform()]) {
      return "Install ";
    } else {
      return "Download ";
    }
  },

  render: function() {
    let releaseTitle = this.props.package.title || this.props.game.title;

    let downloadClass = classSet({
      'game-download': true,
      'download-collapsed': !this.state.downloadOpen
    });

    let builds = this.props.builds.map((build, i) => {
      return (
        <span key={i}>
          <If test={build.os_windows || build.os_windows_64}>
            <i className="ionicons ion-social-windows"></i>
          </If>
          <If test={build.os_mac || build.os_mac_64}>
            <i className="ionicons ion-social-apple"></i>
          </If>
          <If test={build.os_linux || build.os_linux_64}>
            <i className="ionicons ion-social-tux"></i>
          </If>
          <If test={build.type == "html"}>
            <i className="ionicons ion-social-chrome"></i>
          </If>
          <If test={build.os_other}>
            <i className="ionicons ion-android-laptop"></i>
          </If>
        </span>
      );
    });

    let downloads = this.props.builds.map((build, i) => {
      let size = parseFloat(build.primary_file.filesize / 1000000.0).toFixed(2) + "MB";

      return (
        <span key={i}>
          <If test={build.os_windows || build.os_windows_64}>
            <button className="button-full text-white" onClick={this.getBuildAction(build)}>
              <i className="ionicons ion-social-windows"></i> {this.getPlatformAction(build)} for Windows <span className="subtext">{size}</span>
            </button>
          </If>
          <If test={build.os_mac || build.os_mac_64}>
            <button className="button-full text-white" onClick={this.getBuildAction(build)}>
              <i className="ionicons ion-social-apple"></i> {this.getPlatformAction(build)} for Mac <span className="subtext">{size}</span>
            </button>
          </If>
          <If test={build.os_linux || build.os_linux_64}>
            <button className="button-full text-white" onClick={this.getBuildAction(build)}>
              <i className="ionicons ion-social-tux"></i> {this.getPlatformAction(build)} for Linux <span className="subtext">{size}</span>
            </button>
          </If>
          <If test={build.type == "html"}>
            <button className="button-full text-white" onClick={this.getBuildAction(build)}>
              <i className="ionicons ion-social-chrome"></i> Play <span className="subtext">{size}</span>
            </button>
          </If>
          <If test={build.os_other}>
            <button className="button-full text-white" onClick={this.downloadBuild(build)}>
              <i className="ionicons ion-android-laptop"></i> {this.getPlatformAction(build)} for other <span className="subtext">{size}</span>
            </button>
          </If>
          <Progress downloads={this.state.builds} build={build}/>
        </span>
      );
    });

    return (
      <div>
        <div onClick={this.openDownload} className="game-package">
          <span className="package-title">{releaseTitle}</span>
          <span className="package-version">version {this.props.release.version_number}</span>
          <div className="package-platforms">
            {builds}
          </div>
        </div>
        <div className={downloadClass}>
          {downloads}
        </div>
      </div>
    );
  }

});

module.exports = Package;
