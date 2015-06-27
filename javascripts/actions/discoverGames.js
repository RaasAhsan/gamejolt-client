let axios = require("axios");

let discoverGames = (callback) => {
  axios.get('https://gamejolt.com/site-api/web/discover')
      .then((data) => {
        callback(data.data.payload);
      }).catch((error) => {
        console.error(error);
      })
}

module.exports = discoverGames;
