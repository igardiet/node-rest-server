const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      users: '/api/users',
    };
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
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.users, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`Server running in port: ${this.port}`);
    });
  }
}
module.exports = Server;
