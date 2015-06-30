
export let general = (gameId) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/discover/games/' + gameId
  };
}

export let overview = (gameId) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/discover/games/overview/' + gameId
  };
}
