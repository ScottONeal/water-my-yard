const Sprinkler = require('./models/sprinkler');

const sprinklers = [
  new Sprinkler({ name: 'Sprinkler 1', active: false, pinF: 15, pinR: 13, pinE: 11 }),
  new Sprinkler({ name: 'Sprinkler 2', active: false, pinF: 16, pinR: 18, pinE: 22 }),
  new Sprinkler({ name: 'Sprinkler 3', active: false, pinF: 21, pinR: 23, pinE: 19 })
];

async function setup(wmy) {
  for ( const sprinkler of sprinklers ) {
    await sprinkler.setup();
  }

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
      sprinklers[req.params.id][req.params.action]();
      return JSON.stringify({ status: 'success' });
    }
  })
}

module.exports = { setup };