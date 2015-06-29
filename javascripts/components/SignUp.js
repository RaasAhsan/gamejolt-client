import React from "react";

let classSet = require("react-classset");

let GameThumbnail = require("./GameThumbnail");

let WebInterface = require("../api/WebInterface");
let getCustomizedPage = require("../actions/getCustomizedPage");

let SignUp = React.createClass({

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

  render: function() {
    let featuredStyle = {
      backgroundImage: 'url(' + this.state.background.mediaItem.img_url + ')'
    };

    return (
      <div className="auth-page">
        <div className="auth-page-contents" style={featuredStyle}>
        </div>
      </div>
    );
  }

});

module.exports = SignUp;
