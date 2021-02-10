const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String,
    data: String,
    time: String,
    randomNumber(max: Int!): Int
  }
`);

const root = {
  hello: () => 'Hello world!',
  data: () => 'This is some data',
  time: () => new Date(),
  randomNumber: ({ max }) => Math.floor(Math.random() * max)
};

const app = express();

app.use((req, res, next) => next(console.log(req.ip)));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));
