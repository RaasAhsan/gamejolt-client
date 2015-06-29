import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getGameToken = require("../actions/getGameToken");

let GameToken = React.createClass({

  getInitialState: function() {
    return {
      token: ""
    };
  },

  componentDidMount: function() {
    new WebInterface().makeRequest(getGameToken, (payload) => {
      this.setState({token: payload.token});
    });
  },

  render: function() {
    return (
      <div>
        <section className="page-section">
          <div className="section-title">Your Game Token</div>
          <div className="section-content">
            Your token is: {this.state.token}. If you think your token has been compromised or you would like another one, go to the game website.
          </div>
        </section>
      </div>
    );
  }

});

module.exports = GameToken;
