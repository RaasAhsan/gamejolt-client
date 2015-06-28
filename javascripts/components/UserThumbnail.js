import React from "react";

import Router from '../router/Router';
let Link = Router.Link;

let UserThumbnail = React.createClass({

  propTypes: {

    user: React.PropTypes.object.isRequired

  },

  render: function() {
    return (
      <Link to="userPage" className="user-thumbnail pure-u-4-24">
        <img src={this.props.user.img_avatar}/>
        <div className="user-label">
          {this.props.user.display_name}
        </div>
      </Link>
    );
  }

});

module.exports = UserThumbnail;
