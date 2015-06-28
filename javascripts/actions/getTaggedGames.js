let getTaggedGames = (tag) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/library/games/tag/' + tag
  };
}

module.exports = getTaggedGames;
