
let login = (username, password) => {
  return {
    method: 'post',
    url: 'https://gamejolt.com/site-api/web/auth/login',
    data: {
      username: username,
      password: password
    }
  }
}

module.exports = login;
