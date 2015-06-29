import React from 'react';

import StoreListener from './mixins/StoreListener';
import UserStore from '../stores/UserStore';

import Router from '../router/Router';
let Link = Router.Link;

import If from './control/If';
import assign from 'object-assign';

let WebInterface = require("../api/WebInterface");
let logout = require("../actions/logout");

let UserControl = React.createClass({

  mixins: [StoreListener],

  statics: {
    stores: [UserStore]
  },

  getInitialState: function() {
    return assign(window.dispatcher.getStore(UserStore).getState());
  },

  onChange: function() {
    this.setState(assign(window.dispatcher.getStore(UserStore).getState()));
  },

  onLogOut: function(e){
    new WebInterface().makeRequest(logout, (payload) => {
      window.dispatcher.dispatch('logout', payload);
    });
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
            <If test={this.props.showNav >= 7}>
              <Link to="login" activeClassName="active-nav" className="sidebar-nav">
                <div>
                  <i className="ionicons ion-log-in"></i> Log in to GameJolt
                </div>
              </Link>
            </If>
            <If test={this.props.showNav >= 8}>
              <Link to="signUp" activeClassName="active-nav" className="sidebar-nav">
                <div>
                  <i className="ionicons ion-person"></i> Sign up on GameJolt
                </div>
              </Link>
            </If>
          </div>
        </If>
      </div>
    );
  }

});

module.exports = UserControl;
