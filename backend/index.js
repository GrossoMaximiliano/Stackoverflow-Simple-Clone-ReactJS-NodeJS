const routes = require('./routes/routes');
const dbConnect = require('./db/database');

routes.defineRoutes();

dbConnect(); //MongoDB database by Mongoose