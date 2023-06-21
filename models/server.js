const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = '/api/users';
    this.connectDB(); // Connection to database
    this.middlewares(); // Middlewares
    this.routes(); // App routes
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors()); // cors
    this.app.use(express.json()); // Body parse
    this.app.use(express.static('public')); // Public directory
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`Server running in port: ${this.port}`);
    });
  }
}
module.exports = Server;
