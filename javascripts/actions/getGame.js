
let getGame = (gameId) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/discover/games/' + gameId
  };
}

module.exports = getGame;
