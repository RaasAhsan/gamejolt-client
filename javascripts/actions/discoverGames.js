let axios = require("axios");

let discoverGames = {
  method: 'get',
  url: 'https://gamejolt.com/site-api/web/discover'
}

module.exports = discoverGames;
