const { GraphQLObjectType, GraphQLSchema, GraphQLID } = require("graphql");

const {
  LaundryRooms,
  LaundryRoom,
  LaundryRoomDetailed,
  LaundryMachine,
  LaundryMachineDetailed,
} = require("./laundry/laundrySchemas");

const {
  getLaundryRooms,
  getLaundryRoom,
  getLaundryMachine,
} = require("./laundry/laundryQueries");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    laundryRooms: {
      type: LaundryRooms,
      resolve(parent, args) {
        return getLaundryRooms();
      },
    },
    laundryRoom: {
      type: LaundryRoom,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getLaundryRoom(args.id, false);
      },
    },
    laundryRoomDetailed: {
      type: LaundryRoomDetailed,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getLaundryRoom(args.id, true);
      },
    },
    laundryMachine: {
      type: LaundryMachine,
      args: { id: { type: GraphQLID }, machineId: { type: GraphQLID } },
      resolve(parent, args) {
        return getLaundryMachine(args.id, args.machineId, false);
      },
    },
    laundryMachineDetailed: {
      type: LaundryMachineDetailed,
      args: { id: { type: GraphQLID }, machineId: { type: GraphQLID } },
      resolve(parent, args) {
        return getLaundryMachine(args.id, args.machineId, true);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
