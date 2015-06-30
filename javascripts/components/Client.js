import React from "react";

let Sidebar = require("./Sidebar");

let ChatInterface = require('../api/ChatInterface');

let WebInterface = require('../api/WebInterface');
let login = require('../actions/login');
let getNotifications = require('../actions/getNotifications');
let getFriendRequests = require('../actions/getFriendRequests');

let notify = require('../actions/notify');

let Client = React.createClass({

  getInitialState: function() {
    return {
      chatInterface: null,
      friendRequests: [],
      notifications: []
    };
  },

  componentDidMount: function() {
    // new WebInterface().makeRequest(login(auth.username, auth.password), (data) => {
    //   if(data.success) {
    //     new WebInterface().makeRequest(getFriendRequests, (data) => {
    //       this.setState({friendRequests: data.requests});
    //     });
    //     this.requestInterval = setInterval(() => {
    //       new WebInterface().makeRequest(getFriendRequests, (data) => {
    //         let newFriendRequests = data.requests.filter(n => this.state.friendRequests.map(f => f.id).indexOf(n.id) == -1);
    //
    //         newFriendRequests.forEach((req) => {
    //           notify('New friend request', `${req.user.display_name} wants to be friends with you!`);
    //         });
    //
    //         this.setState({friendRequests: data.requests});
    //       });
    //     }, 10000);
    //
    //     new WebInterface().makeRequest(getNotifications, (data) => {
    //       this.setState({notifications: data.notifications});
    //     });
    //     this.notificationInterval = setInterval(() => {
    //       new WebInterface().makeRequest(getNotifications, (data) => {
    //         let newNotifications = data.notifications.filter(n => this.state.notifications.map(f => f.id).indexOf(n.id) == -1);
    //
    //         newNotifications.forEach((n) => {
    //           if(n.type == 'game-rating-add') {
    //             notify('New game rating', `${n.object_model.title} got a rating of ${n.action_model.rating}!`);
    //           } else if(n.type == "comment-add-object-owner") {
    //             notify('New game comment', `${n.subject_model.display_name} commented on ${n.action_model.title}!`);
    //           }
    //         });
    //
    //         this.setState({notifications: data.notifications});
    //       });
    //     }, 10000);
    //
    //     this.setState({chatInterface: new ChatInterface()});
    //     this.state.chatInterface.initialize();
    //   }
    // });
  },

  render: function() {
    return (
      <div className="page-container">
        <Sidebar chatInterface={this.state.chatInterface} friendRequests={this.state.friendRequests} notifications={this.state.notifications}/>
        <div className="route-content pure-u-20-24">
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Client;
