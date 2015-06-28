require('../less/main.less');

'use strict';

import React from "react";

import Router from "./router/Router";
import Routes from "./Routes";

import Client from './components/Client';

import dispatcher from './dispatcher';
window.dispatcher = dispatcher; // try to use contexts to implement this later

React.render(<Router handler={Client} routes={Routes}/>, document.getElementById('content'));
