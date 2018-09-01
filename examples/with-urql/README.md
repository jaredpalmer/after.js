# After.js x Razzle x urql

# start SWAPI graphql server

`git clone git@github.com:graphql/swapi-graphql.git`
`cd swapi-graphql`
`yarn install`

patch it with cors, if needed
`yarn add cors`
```js
// ./src/server/main.js
import express from 'express';
import graphqlHTTP from 'express-graphql';
import swapiSchema from '../schema';
import cors from 'cors';

const app = express();

app.use(cors());

...
```

`PORT=64895 yarn start`

this will start a local server on `http://localhost:64895` ; port may change, update it in `createUrqlClient.js`

# start example

`yarn install`
`yarn start`
