let getDownload = (buildId) => {
  return {
    method: 'post',
    url: 'https://gamejolt.com/site-api/web/discover/games/builds/get-download-url/' + buildId
  };
}

module.exports = getDownload;
