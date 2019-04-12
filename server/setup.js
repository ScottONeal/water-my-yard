const Hapi   = require('hapi');
const good   = require('good');
const routes = require('./routes');

class WaterMyYardServer {
  constructor() {
    this.port = process.env.PORT || 3000
    this.host = 'localhost';

    this.server = Hapi.server({
      port: this.port,
      host: this.host
    });
  } 

  async start() {
    await this.setup();
    await this.server.start();
    console.log(`WaterMyYard Server running on ${this.host}:${this.port}`)
  }

  async setup() {
    try {
      await this.setupLogging();
      await this.setupRoutes();
    }
    catch(error) {
      console.error('Unable to setup WaterMyYard Server!');
      console.error(error);
      process.exit(1);
    }
  }

  async setupLogging() {
    await this.server.register({
      plugin: good,
      options: {
        reporters: { 
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
              log: '*',
              response: '*'
            }]
          },
          {
            module: 'good-console'
          },
          'stdout']
        }
      }
    });
  }

  setupRoutes() {
    routes.setup(this); 
  }
}

module.exports = WaterMyYardServer;