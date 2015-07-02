import React from "react";

import Router from '../router/Router';

let classSet = require("react-classset");
let If = require("./control/If");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getCustomizedPage = require("../actions/getCustomizedPage");
let login = require("../actions/login");

let Login = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      background: {
        mediaItem: {
          img_url: ""
        }
      },
      backgroundLoaded: false,
      showField: 0,
      loading: false
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getCustomizedPage, (payload) => {
      this.setState({background: payload});
      var i = new Image();
      i.src = payload.mediaItem.img_url;
      i.onload = () => {
        this.setState({backgroundLoaded: true});
      };
    });

    this.showInterval = setInterval(() => {
      if(this.state.showField == 3) {
        clearInterval(this.showInterval);
      } else {
        this.setState({showField: this.state.showField + 1});
      }
    }, 50);
  },

  login: function(){
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

    this.setState({loading: true});

    new WebInterface().makeRequest(login(username, password), (payload) => {
      if(payload.success){
        this.context.router.routeTo('index', {});
        window.dispatcher.dispatch('user-data', payload.user);
      } else {
        this.setState({loading: false});
      }
    });
  },

  render: function() {
    let featuredStyle = {
      backgroundImage: this.state.backgroundLoaded ? 'url(' + this.state.background.mediaItem.img_url + ')' : 'url()'
    };

    return (
      <div className="auth-background">
        <div className="auth-background-contents" style={featuredStyle}>
        </div>
        <div className="auth-contents">
          <div className="pure-u-8-24"></div>
          <div className="pure-u-8-24 auth-section">
            <div className="auth-header">
              <img src="images/gj-logo.svg"/>
              <div className="auth-textboxes">
                <If test={this.state.showField >= 0}>
                  <input className="auth-show-field" ref="username" type="text" placeholder="Enter your username..."/>
                </If>
                <If test={this.state.showField >= 1}>
                  <input className="auth-show-field" ref="password" type="password" placeholder="Enter your password..."/>
                </If>
              </div>
              <If test={this.state.loading}>
                <div className="auth-loading"><img src="https://b6d3e9q9.ssl.hwcdn.net/lib/gj-lib-client/components/loading/loading.7084ee07.gif"/></div>
              </If>
              <If test={this.state.showField >= 2}>
                <button onClick={this.login} className="button-full auth-show-field">Log in</button>
              </If>
            </div>
          </div>
          <div className="pure-u-8-24"></div>
        </div>
      </div>
    );
  }

});

module.exports = Login;
