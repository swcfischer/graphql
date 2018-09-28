const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();


const bodyParser = require('body-parser');


require('dotenv').config({ path: 'variables.env' });

const PORT = process.env.PORT || 4444;

// models

const User = require('./models/User');

// bring in graphql middleware
const { graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'null') {
    try {
      const currentUser = jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;

    } catch(error) {
      console.error(error);
    }
  }
  next()
})
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}
));

app.use(
  '/graphql', 
  bodyParser.json(),
  
  graphqlExpress(({ currentUser }) => ({ 
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  })));
  
// Connects database

mongoose
  .connect(process.env.DATABASE)
  .then( () => console.log('database is connected'))
  .catch( err => console.error(err) );

// Initializes server

app.listen(PORT, () => {
  console.log('server is listening on ' + PORT);
});