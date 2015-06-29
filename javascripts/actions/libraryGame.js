export let addGame = (gameId) => {
  return {
    method: 'post',
    url: 'https://gamejolt.com/site-api/web/library/games/add/followed',
    data: {
      game_id: gameId
    }
  };
}

export let removeGame = (gameId) =>{
  return {
    method: 'post',
    url: 'https://gamejolt.com/site-api/web/library/games/remove/followed/' + gameId
  };
}
