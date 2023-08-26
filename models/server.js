const express = require( 'express' );
const fileUpload = require( 'express-fileupload' );
const cors = require( 'cors' );
const gracefulFs = require( 'graceful-fs' );
const { dbConnection } = require( '../database/config' );

class Server
{
  constructor()
  {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      auth: '/api/auth',
      search: '/api/search',
      categories: '/api/categories',
      products: '/api/products',
      uploads: '/api/uploads',
      users: '/api/users',
    };
    this.connectDB(); // Connection to database
    this.middlewares(); // Middlewares
    this.routes(); // App routes
  }

  async connectDB()
  {
    await dbConnection();
  }

  middlewares()
  {
    this.app.use( cors() ); // cors
    this.app.use( express.json() ); // Body read and parse
    this.app.use( express.static( 'public' ) ); // Public directory
    // Error handling middleware
    this.app.use( ( err, req, res, next ) =>
    {
      console.error( err );
      res.status( 500 ).json( { error: 'Internal Server Error' } );
    } );
    // File upload
    this.app.use(
      fileUpload( {
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true
      } )
    );
  }

  routes()
  {
    this.app.use( this.paths.auth, require( '../routes/auth' ) );
    this.app.use( this.paths.search, require( '../routes/search' ) );
    this.app.use( this.paths.categories, require( '../routes/categories' ) );
    this.app.use( this.paths.products, require( '../routes/products' ) );
    this.app.use( this.paths.uploads, require( '../routes/uploads' ) );
    this.app.use( this.paths.users, require( '../routes/users' ) );
  }

  listen()
  {
    const server = this.app.listen( this.port || 3000, () =>
    {
      console.log( `Server running in port: ${this.port}` );
    } );

    // Graceful shutdown
    process.on( 'SIGINT', () =>
    {
      console.log( 'Shutting down server...' );
      server.close( () =>
      {
        gracefulFs.close(); // Close graceful-fs to ensure file operations are completed
        process.exit( 0 );
      } );
    } );
  }
}
module.exports = Server;
