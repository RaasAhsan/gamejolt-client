require('../less/main.less');

'use strict';

import React from "react";

import Router from "./router/Router";
import Routes from "./Routes";

import Client from './components/Client';

React.render(<Router handler={Client} routes={Routes}/>, document.getElementById('content'));
