let getDeveloperGames = (userId) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/library/games/developer/' + userId
  };
}

module.exports = getDeveloperGames;
