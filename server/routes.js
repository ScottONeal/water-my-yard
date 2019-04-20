const fs             = require('fs');
const path           = require('path');
const { sprinklers } = require('./models/sprinklers');

const configFile = path.join(__dirname, '../config.json');

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
  });

  wmy.server.route({
    method: 'PUT',
    path: '/api/sprinkler/{id}',
    handler: async (req) => {
      try {
        const id      = req.params.id;
        const payload = req.payload;
        const config  = JSON.parse(fs.readFileSync(configFile));
        const name    = payload.name;

        sprinklers[id].name = name;
        config[id].name     = payload.name;

        fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
        return JSON.stringify(sprinklers[id]);
      }
      catch (error) {
        req.response.code(500);
        return JSON.stringify({ status: 'failed', error });
      }
    }
  });
}

module.exports = { setup };