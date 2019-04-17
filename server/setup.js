const Hapi       = require('@hapi/hapi');
const Vision     = require('@hapi/vision');
const Good       = require('good');
const Handlebars = require('handlebars');
const routes     = require('./routes');
const sprinklers = require('./models/sprinklers');

class WaterMyYardServer {
  constructor() {
    this.port = process.env.PORT || 3000

    this.server = Hapi.server({
      port: this.port
    });
  } 

  async start() {
    await this.setup();
    await this.server.start();
    console.log(`WaterMyYard Server running on port: ${this.port}`)
  }

  async setup() {
    try {
      await this.setupLogging();
      await this.setupSprinklers();
      await this.setupViews();
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
      plugin: Good,
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

  async setupSprinklers() {
    await sprinklers.setup();
  }

  async setupViews() {
    this.server.register(Vision);
    this.server.views({
      engines: { html: Handlebars },
      relativeTo: __dirname,
      path: '../templates'
    });
  }

  async setupRoutes() {
    await routes.setup(this); 
  }
}

module.exports = WaterMyYardServer;