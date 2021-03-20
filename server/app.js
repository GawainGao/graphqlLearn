const express = require('express');
const graphglHTTP = require('express-graphql').graphqlHTTP;

const app = express();
const schema = require('./schema/schema')
app.use('/graphql', graphglHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(4000, () => { //localhost:4000
  console.log('Listening for requests on my awssome port 4000')
})