const Sprinkler = require('./sprinkler');

const sprinklers = [
  new Sprinkler({ name: 'Sprinkler 1', active: false, pinF: 15, pinR: 13, pinE: 11 }),
  new Sprinkler({ name: 'Sprinkler 2', active: false, pinF: 16, pinR: 18, pinE: 22 }),
  new Sprinkler({ name: 'Sprinkler 3', active: false, pinF: 21, pinR: 23, pinE: 19 })
];

async function setup() {
  for ( const sprinkler of sprinklers ) {
    if ( process.env.WMY_BYPASS_SPRINKLER_SETUP ) {
      return;
    }

    await sprinkler.setup();
  }

  return sprinklers;
}

module.exports = {
  setup,
  sprinklers
}