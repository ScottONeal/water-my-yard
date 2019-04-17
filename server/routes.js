const { sprinklers } = require('./models/sprinklers');

async function setup(wmy) {
  wmy.server.route({
    method: 'GET',
    path: '/',
    handler: (req, h) => {
      console.log(h.view);
      return h.view('index', { sprinklers });
    }
  });

  wmy.server.route({
    method: 'GET',
    path: '/api/sprinkler/{id}/{action}',
    handler: (req) => {
      try {
        sprinklers[req.params.id][req.params.action]();
        return JSON.stringify({ status: 'success' });
      }
      catch (error) {
        request.response.code(500);
        return JSON.stringify({ status: 'failed', error });
      }
    }
  })
}

module.exports = { setup };