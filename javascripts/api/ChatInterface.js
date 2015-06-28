const CHAT_SERVER = 'http://schat.gamejolt.com/';

export default class {

  constructor() {
    this.client = new Primus(CHAT_SERVER);
  }

  initialize() {
    this.client.on('open', () => {
      console.log('Sending frontend cookies...');
      this.sendFrontend();
    });

    this.client.on('data', (msg) => {
      if(msg.event == 'connected') {
        console.log('Connected to GameJolt chat server.');
      } else if(msg.event == 'update') {
        this.processPayload(msg);
      }
    });

    this.client.on('reconnect', (opts) => {
      this.log('Attemping to reconnect...');
    });

    this.client.on('reconnected', (opts) => {
      this.log('Reconnected to GameJolt chat server.');
    });

    this.client.on('error', (err) => {
      console.error('Whoops!', err.stack);
    });

    this.client.on('end', (opts) => {
      this.log('Disconnected from GameJolt chat server.');
    });
  }

  sendFrontend() {
    this.client.write({event: 'set-cookie', cookie: 't7bjutdhqq3me7no1nqa5g7v36'});
  }

  processPayload(payload) {
    payload.actions.forEach(msg => {
      if(msg.label == 'messages') {
      } else if(msg.label == 'activeRoom') {
      } else if(msg.label == 'friendsList') {
      } else if(msg.label == 'allCount') {
        this.onlineUsers(msg.data);
      } else if(msg.label == 'onlineUsers') {
      } else if(msg.label == 'rooms') {
      } else if(msg.label == 'userMuted') {
      } else if(msg.label == 'notifications') {
        console.log(msg.data);
      } else {
        console.log(msg);
      }
    });
  }

  onOnlineUsersChanged(callback) {
    this.onlineUsers = callback;
  }

}
