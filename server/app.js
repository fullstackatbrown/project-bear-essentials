const express = require("express");
const graphqlHTTP = require("express-graphql");
require("dotenv").config();

const { getCafes } = require("./graphql/dining/diningQueries");

const app = express();
const port = process.env.PORT || 8080;

const schema = require("./graphql/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

getCafes();

app.listen(port, () => {
  console.log("Hello world listening on port", port);
});
