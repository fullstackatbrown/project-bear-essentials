import { GraphQLObjectType, GraphQLInt, GraphQLList } from "graphql";

//TODO: These query schemas
const CafeType = new GraphQLObjectType({
    name: "CafeType",
    fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
    }),
  });