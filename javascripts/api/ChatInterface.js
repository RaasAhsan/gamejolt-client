const CHAT_SERVER = 'http://schat.gamejolt.com/';

export default class {

  constructor() {
    this.client = new Primus(CHAT_SERVER);
  }

  initialize() {
    this.client.on('open', () => {
      console.log('Sending frontend cookies...');

      getFrontendCookie((frontend) => {
        if(!this.frontendSent) {
          this.frontendSent = true;
          this.sendFrontend(frontend);
        }
      });
    });

    this.client.on('data', (msg) => {
      if(msg.event == 'connected') {
        console.log('Connected to GameJolt chat server.');
        this.processPayload(msg);
      } else if(msg.event == 'update') {
        this.processPayload(msg);
      }
    });

    this.client.on('reconnect', (opts) => {
      console.log('Attemping to reconnect...');
    });

    this.client.on('reconnected', (opts) => {
      console.log('Reconnected to GameJolt chat server.');
    });

    this.client.on('error', (err) => {
      console.error('Whoops!', err.stack);
    });

    this.client.on('end', (opts) => {
      console.log('Disconnected from GameJolt chat server.');
    });
  }

  sendFrontend(frontend) {
    this.client.write({event: 'set-cookie', cookie: frontend});
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
      } else if(msg.label == 'currentUser') {
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
