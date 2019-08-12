import React from 'react';
import { Route } from "react-router-dom"

function NotFound() {
	return (
		<Route
			render={({ staticContext }) => {
				if (staticContext) staticContext.statusCode = 404;
				return <div>The Page You Were Looking For Was Not Found</div>;
			}}
		/>
	)
}

export default NotFound;
