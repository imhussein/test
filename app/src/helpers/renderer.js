import { renderToString } from "react-dom/server";
import React from "react";
import { StaticRouter as Router } from "react-router-dom";
import Routes from "../../client/src/Routes";

export default req => {
  const content = renderToString(
    <Router location={req.url} context={{}}>
      <Routes />
    </Router>
  );
  const markup = `
    <html>
    <head>
     <link rel="stylesheet" href="/assets/materialize.css">
     <link rel="stylesheet" href="/assets/App.css">
    </head>
    <body>
      <div id="root">${content}</div>
      <script src="/assets/index_bundle.js"></script>
    </body>
    </html>
  `;
  return markup;
};
