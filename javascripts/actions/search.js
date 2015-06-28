
let search = (q) => {
  return {
    method: 'get',
    url: 'https://gamejolt.com/site-api/web/search',
    headers: [],
    params: {
      q: q
    }
  }
}

module.exports = search;
