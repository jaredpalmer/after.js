# Document Head

After.js uses [React Helmet](https://github.com/nfl/react-helmet) for managing doucment head.
Helmet will manage all of your changes to the document head. it takes plain HTML tags and outputs plain HTML tags. It's dead simple, and React beginner friendly.

```jsx
// Product.js

import React from 'react';
import { NavLink } from 'react-router-dom';

function Product({ item }) {
  return (
    <div>
      <Helmet>
        <title>{item.name}</title>
        <meta name="description" content={item.description} />
      </Helmet>
      <h1>{item.name}</h1>
    </div>
  );
}

Product.getInitialProps = async ({ match }) => {
  const product = await CallMyApi(`/v1/item${match.params.id}`);
  return { product };
};

export default Product;
```
