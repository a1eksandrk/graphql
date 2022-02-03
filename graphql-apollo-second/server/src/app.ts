import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import mongoose from "mongoose";

import schema from "./schema/schema";

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const PORT = 3005;

export const start = (port?: number) => {
  const usedPort = port ?? PORT;

  mongoose.connect('mongodb://localhost:27017/graphql-first')
    .then(() => console.log('Connected to DB!'))
    .catch((error) => console.error(error));

  app.listen(usedPort, () => {
    console.log(`Server was started on port ${usedPort}!`);
  });
};
