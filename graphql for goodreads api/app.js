const express = require('express'),
 app = express(),
 graphqlHTTP = require('express-graphql');

 const schema = require('./schema');

 app.use('/graphql', graphqlHTTP({
 	schema,
 	graphiql:true
 }))

 app.listen(3000,()=>console.log('listening..........'))

