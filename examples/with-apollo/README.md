# After.js x Razzle x Apollo Example

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

`yarn start`

this will start a local server on `http://localhost:8080` ; port may change, update it in `createApolloClient.js`

# start example

`yarn install`
`yarn start`
