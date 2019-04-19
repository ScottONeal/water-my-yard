const { sprinklers } = require('./models/sprinklers');

async function setup(wmy) {
  wmy.server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: './',
        listing: true,
        redirectToSlash: true
      }
    }
  });

  wmy.server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      return h.view('index', { sprinklers });
    }
  });

  wmy.server.route({
    method: 'GET',
    path: '/api/sprinkler/{id}/{action}',
    handler: async (req) => {
      const id = req.params.id;
      try {
        await sprinklers[id][req.params.action]();
        return JSON.stringify(sprinklers[id]);
      }
      catch (error) {
        request.response.code(500);
        return JSON.stringify({ status: 'failed', error });
      }
    }
  })
}

module.exports = { setup };