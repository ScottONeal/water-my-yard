const Sprinkler = require('./sprinkler');

const sprinklers = [
  new Sprinkler({ id: 0, name: 'Sprinkler 1', active: false, pinF: 15, pinR: 13, pinE: 11 }),
  new Sprinkler({ id: 1, name: 'Sprinkler 2', active: false, pinF: 16, pinR: 18, pinE: 22 }),
  new Sprinkler({ id: 2, name: 'Sprinkler 3', active: false, pinF: 21, pinR: 23, pinE: 19 })
];

async function setup() {
  for ( const sprinkler of sprinklers ) {
    await sprinkler.setup();
  }

  return sprinklers;
}

module.exports = {
  setup,
  sprinklers
}