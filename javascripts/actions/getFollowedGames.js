let getFollowedGames = (userId) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/library/games/followed/' + userId
  };
}

module.exports = getFollowedGames;
