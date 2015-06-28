import React from 'react';

import StoreListener from './mixins/StoreListener';
import UserStore from '../stores/UserStore';

import Router from '../router/Router';
let Link = Router.Link;

import If from './control/If';
import assign from 'object-assign';

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
    console.log("logging out");
  },

  render: function() {
    return (
      <div className="pure-1-1 sidebar-user">
        <If test={this.state.user != null}>
          <div>
            <div className="pure-u-1-4">
              <img src={this.state.user.img_avatar}/>
            </div>
            <div className="pure-u-3-4">
              <Link to="gameToken" activeClassName="active-user-action" className="user-action"><div><i className="ionicon ion-locked"></i> Game Token</div></Link>
              <div onClick={this.onLogOut} className="user-action"><div><i className="ionicon ion-log-out"></i> Log out</div></div>
            </div>
          </div>
        </If>
      </div>
    );
  }

});

module.exports = UserControl;
