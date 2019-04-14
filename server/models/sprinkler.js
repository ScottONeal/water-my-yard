const gpio  = require('rpi-gpio');
const gpiop = gpio.promise;

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
    await gpiop.setup(this.pinF, gpio.DIR_OUT);
    await gpiop.setup(this.pinR, gpio.DIR_OUT);
    await gpiop.setup(this.pinE, gpio.DIR_OUT);
    await gpiop.write(this.pinE, true);
  }

  async activate() {
    await gpiop.write(this.pinF, true);
    this.active = true;
  }

  async deactivate() {
    await gpiop.write(this.pinF, false);
    this.active = false;
  }
}

module.exports = Sprinkler;