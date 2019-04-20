const Sprinkler = require('./sprinkler');
const config    = require('../../config');

const sprinklers = [];

async function setup() {
  for ( const sprinklerConf of config ) {
    const sprinkler = new Sprinkler(sprinklerConf);
    await sprinkler.setup();
    sprinklers.push(sprinkler);
  }

  return sprinklers;
}

module.exports = {
  setup,
  sprinklers
}