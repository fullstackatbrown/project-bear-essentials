const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
} = require("graphql");

// Reusable Laundry Room GraphQL Type
const RoomType = new GraphQLObjectType({
    name: "RoomType",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
    }),
});

// Reusable Laundry Machine GraphQL Type
const MachineType = new GraphQLObjectType({
    name: "MachineType",
    fields: () => ({
        id: { type: GraphQLInt },
        room_id: { type: GraphQLInt },
        type: { type: GraphQLString },
    }),
});

// Reusable Detailed Laundry Machine GraphQL Type
const MachineDetailedType = new GraphQLObjectType({
    name: "MachineDetailedType",
    fields: () => ({
        id: { type: GraphQLInt },
        room_id: { type: GraphQLInt },
        type: { type: GraphQLString },
        machine_no: { type: GraphQLInt },
        avail: { type: GraphQLBoolean },
        ext_cycle: { type: GraphQLBoolean },
        offline: { type: GraphQLBoolean },
        average_run_time: { type: GraphQLInt },
        time_remaining: { type: GraphQLInt },
    }),
});

// Endpoint for /laundry/rooms
// Returned by getLaundryRooms()
const LaundryRooms = new GraphQLObjectType({
    name: "LaundryRooms",
    fields: () => ({
        num_result: { type: GraphQLInt },
        results: { type: new GraphQLList(RoomType) },
    }),
});

// Endpoint for /laundry/rooms/<room_id>
// Returned by getLaundryRoom(room_id, details=false)
const LaundryRoom = new GraphQLObjectType({
    name: "LaundryRoom",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        machines: { type: new GraphQLList(MachineType) },
    }),
});

// Endpoint for /laundry/rooms/<room_id>?get_status=true
// Returned by getLaundryRoom(room_id, details=true)
const LaundryRoomDetailed = new GraphQLObjectType({
    name: "LaundryRoomDetailed",
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        machines: { type: new GraphQLList(MachineDetailedType) },
    }),
});

//Endpoint for /laundry/rooms/<room_id>/machines/<machine_id>
// Returned by getLaundryMachine(room_id, machine_id, details=false)
const LaundryMachine = new GraphQLObjectType({
    name: "LaundryMachine",
    fields: () => ({
        result: { type: MachineType },
    }),
});

//Endpoint for /laundry/rooms/<room_id>/machines/<machine_id>?get_status=true
// Returned by getLaundryMachine(room_id, machine_id, details=true)
const LaundryMachineDetailed = new GraphQLObjectType({
    name: "LaundryMachineDetailed",
    fields: () => ({
        result: { type: MachineDetailedType },
    }),
});

module.exports = {
    LaundryRooms: LaundryRooms,
    LaundryRoom: LaundryRoom,
    LaundryRoomDetailed: LaundryRoomDetailed,
    LaundryMachine: LaundryMachine,
    LaundryMachineDetailed: LaundryMachineDetailed,
};