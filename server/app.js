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

// TODO: Figure out why this is here?
getCafes();

app.listen(port, () => {
    console.log("Brown Essentials server listening on port", port);
});
