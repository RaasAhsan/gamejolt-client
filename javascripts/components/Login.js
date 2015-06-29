import React from "react";

import Router from '../router/Router';

let classSet = require("react-classset");

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
      }
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getCustomizedPage, (payload) => {
      this.setState({background: payload});
    });
  },

  login: function(){
    let username = this.refs.username.getDOMNode().value;
    let password = this.refs.password.getDOMNode().value;

    new WebInterface().makeRequest(login(username, password), (payload) => {
      if(payload.success){
        this.context.router.routeTo('index', {});
        window.dispatcher.dispatch('user-data', payload.user);
      }
    });
  },

  render: function() {
    let featuredStyle = {
      backgroundImage: 'url(' + this.state.background.mediaItem.img_url + ')'
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
                <input ref="username" type="text" placeholder="Enter your username..."/>
                <input ref="password" type="password" placeholder="Enter your password..."/>
              </div>
              <button onClick={this.login} className="button-full">Log in</button>
            </div>
          </div>
          <div className="pure-u-8-24"></div>
        </div>
      </div>
    );
  }

});

module.exports = Login;
