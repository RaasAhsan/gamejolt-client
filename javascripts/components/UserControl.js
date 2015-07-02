import React from 'react';

import StoreListener from './mixins/StoreListener';
import UserStore from '../stores/UserStore';

import Router from '../router/Router';
let Link = Router.Link;

import If from './control/If';
import assign from 'object-assign';

let WebInterface = require("../api/WebInterface");
let ChatInterface = require('../api/ChatInterface');

let login = require('../actions/login');
let getNotifications = require('../actions/getNotifications');
let getFriendRequests = require('../actions/getFriendRequests');
let notify = require('../actions/notify');
let logout = require("../actions/logout");

let UserControl = React.createClass({

  mixins: [StoreListener],

  statics: {
    stores: [UserStore]
  },

  getInitialState: function() {
    return assign(window.dispatcher.getStore(UserStore).getState(), {
      friendRequests: [],
      notifications: [],
      onlineUsers: 0
    });
  },

  onChange: function() {
    var data = window.dispatcher.getStore(UserStore).getState();

    this.setupBackground(data.user);
    this.setState(data);
  },

  onLogOut: function(e){
    new WebInterface().makeRequest(logout, (payload) => {
      window.dispatcher.dispatch('logout', payload);
    });
  },

  componentDidMount: function() {
    let chatInterface = new ChatInterface();
    chatInterface.initialize();

    chatInterface.onOnlineUsersChanged((count) => {
      this.setState({onlineUsers: count});
    });

    this.setState({chatInterface: chatInterface});
  },

  setupBackground: function(user) {
    if(user && this.state.user == null) { // Has the user just logged in

      // Get initial friend request count
      new WebInterface().makeRequest(getFriendRequests, (data) => {
        this.setState({friendRequests: data.requests});
      });

      // Now set up an interval to do it
      this.requestInterval = setInterval(() => {
        new WebInterface().makeRequest(getFriendRequests, (data) => {
          let newFriendRequests = data.requests.filter(n => this.state.friendRequests.map(f => f.id).indexOf(n.id) == -1);

          newFriendRequests.forEach((req) => {
            notify('New friend request', `${req.user.display_name} wants to be friends with you!`);
          });

          this.setState({friendRequests: data.requests});
        });
      }, 10000);

      // Get initial notification count
      new WebInterface().makeRequest(getNotifications, (data) => {
        this.setState({notifications: data.notifications});
      });

      // Now set up an interval to do it
      this.notificationInterval = setInterval(() => {
        new WebInterface().makeRequest(getNotifications, (data) => {
          let newNotifications = data.notifications.filter(n => this.state.notifications.map(f => f.id).indexOf(n.id) == -1);

          newNotifications.forEach((n) => {
            if(n.type == 'game-rating-add') {
              notify('New game rating', `${n.object_model.title} got a rating of ${n.action_model.rating}!`);
            } else if(n.type == "comment-add-object-owner") {
              notify('New game comment', `${n.subject_model.display_name} commented on ${n.action_model.title}!`);
            }
          });

          this.setState({notifications: data.notifications});
        });
      }, 10000);
    } else if(user == null && this.state.user != null) { // Has the user signed out
      clearInterval(this.requestInterval);
      clearInterval(this.notificationInterval);
    }
  },

  render: function() {
    let userAvatar = '';
    if(this.state.user) {
      userAvatar = this.state.user.img_avatar;
    }

    return (
      <div className="pure-1-1 sidebar-user">
        <If test={this.state.user != null}>
          <div>
            <div className="pure-u-1-4">
              <img src={userAvatar}/>
            </div>
            <div className="pure-u-3-4">
              <Link to="gameToken" activeClassName="active-user-action" className="user-action"><div><i className="ionicon ion-locked"></i> Game Token</div></Link>
              <div onClick={this.onLogOut} className="user-action"><div><i className="ionicon ion-log-out"></i> Log out</div></div>
            </div>
          </div>
        </If>
        <If test={this.state.user == null}>
          <div>
            <If test={this.props.showNav >= 8}>
              <Link to="login" activeClassName="active-nav" className="sidebar-nav">
                <div>
                  <i className="ionicons ion-log-in"></i> Log in to GameJolt
                </div>
              </Link>
            </If>
            <If test={this.props.showNav >= 9}>
              <Link to="signUp" activeClassName="active-nav" className="sidebar-nav">
                <div>
                  <i className="ionicons ion-person"></i> Sign up on GameJolt
                </div>
              </Link>
            </If>
          </div>
        </If>
        <div className="pure-u-8-24 sidebar-stat users-online">
          <i className="ionicons ion-android-people"></i> <span>{this.state.onlineUsers}</span>
        </div>
        <div className="pure-u-8-24 sidebar-stat friend-requests">
          <i className="ionicons ion-android-person-add"></i> <span>{this.state.friendRequests.length}</span>
        </div>
        <div className="pure-u-8-24 sidebar-stat news-notifications">
          <i className="ionicons ion-ios-lightbulb"></i> <span>{this.state.notifications.length}</span>
        </div>
      </div>
    );
  }

});

module.exports = UserControl;
