const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
// import * as DiningSchema from "./dining/diningSchemas";
// import * as WifiSchema from "./dining/wifiSchemas";
// import * as LaundrySchema from "./dining/laundrySchemas";

//TODO: Define all datatypes, define all
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {},
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
