import axios from 'axios';

import assign from 'object-assign';

export default class {

  constructor(dispatcher) {
    this.dispatcher = dispatcher;
  }

  makeRequest(controller, callback) {
    axios({
      method: controller.method,

      url: controller.url,

      data: controller.data || {},

      params: controller.params || {},

      responseType: 'json',

      withCredentials: true,

      headers: assign({
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
        'Cache-Control': 'no-cache'
      }, controller.headers || {})
    }).then((data) => {
      window.dispatcher.dispatch('user-data', data.data.user);
      callback(data.data.payload);
    }).catch((error) => {
      console.error(error);
    });
  }

}
