export let addRating = (gameId, rating) => {
  return {
    method: 'post',
    url: 'https://gamejolt.com/site-api/web/discover/games/ratings/save/' + gameId,
    data: {
      game_id: gameId,
      rating: rating
    }
  };
}

export let removeRating = (gameId) =>{
  return {
    method: 'post',
    url: 'https://gamejolt.com/site-api/web/discover/games/ratings/clear/' + gameId
  };
}
