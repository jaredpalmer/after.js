import React from 'react';
import { StaticContext } from "react-router"

function NotFound({ staticContext }: {staticContext?: StaticContext}) {
	if (staticContext) staticContext.statusCode = 404
  return <div>The Page You Were Looking For Was Not Found</div>;
}

export default NotFound;
