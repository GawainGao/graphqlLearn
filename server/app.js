const express = require('express');
const graphglHTTP = require('express-graphql').graphqlHTTP;

const cors = require('cors')

const mongoose = require('mongoose');

const mongoUserName = process.env.MONGODBUSER
const mongoPassWord = process.env.MONGODBPASSWORD




mongoose.connect(`mongodb+srv://${mongoUserName}:${mongoPassWord}@gq-course.eyyyl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', ()=>{
  console.log('Yes! We conneted')
})

const app = express();
app.use(cors())
const schema = require('./schema/schema')
app.use('/graphql', graphglHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(4000, () => { //localhost:4000
  console.log('Listening for requests on my awssome port 4000')
})