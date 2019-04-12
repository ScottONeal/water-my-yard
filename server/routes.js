function setup(wmy) {
  wmy.server.route({
    method: 'GET',
    path: '/',
    handler: (req) => {
      return 'Hello World';
    }
  })
}

module.exports = { setup };