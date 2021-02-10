const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String,
    data: String,
    time: String
  }
`);

const root = {
  hello: () => 'Hello world!',
  data: () => 'This is some data',
  time: () => new Date()
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));
