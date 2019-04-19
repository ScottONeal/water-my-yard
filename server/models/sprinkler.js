const gpio  = require('rpi-gpio');
const gpiop = gpio.promise;

const BYPASS = process.env.WMY_BYPASS_SPRINKLER_SETUP;
const write =  BYPASS ? () => {} : gpiop.write;

class Sprinkler {
  constructor(config) {
    this.active = false;
    this.pinF   = config.pinF;
    this.pinR   = config.pinR;
    this.pinE   = config.pinE;
    this.id     = config.id;
    this.name   = config.name || this.id;
  }

  async setup() {
    if ( BYPASS ) return true;

    await gpiop.setup(this.pinF, gpio.DIR_OUT);
    await gpiop.setup(this.pinR, gpio.DIR_OUT);
    await gpiop.setup(this.pinE, gpio.DIR_OUT);
    await gpiop.write(this.pinE, true);
  }

  async activate() {
    await write(this.pinF, true);
    this.active = true;
    this.activedTs = Date.now();
  }

  async deactivate() {
    await write(this.pinF, false);
    this.active = false;
    this.deactivedTs = Date.now();
  }
}

module.exports = Sprinkler;