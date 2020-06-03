import { GraphQLObjectType, GraphQLInt, GraphQLList } from "graphql";

// Reusable Laundry Room GraphQL Type
export const RoomType = new GraphQLObjectType({
  name: "RoomType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

// Reusable Laundry Machine GraphQL Type
export const MachineType = new GraphQLObjectType({
  name: "MachineType",
  fields: () => ({
    id: { type: GraphQLInt },
    room_id: { type: GraphQLInt },
    type: { type: GraphQLString },
  }),
});

// Reusable Detailed Laundry Machine GraphQL Type
export const MachineDetailedType = new GraphQLObjectType({
  name: "MachineDetailedType",
  fields: () => ({
    id: { type: GraphQLInt },
    room_id: { type: GraphQLInt },
    avail: { type: GraphQLBoolean },
    average_tun_time: { type: GraphQLInt },
    time_remaining: { type: GraphQLInt },
    type: { type: GraphQLString },
  }),
});

// Endpoint for /laundry/rooms
// Returned by getLaundryRooms()
export const LaundryRooms = new GraphQLObjectType({
  name: "/laundry/rooms",
  fields: () => ({
    num_result: { type: GraphQLInt },
    results: { type: new GraphQLList(RoomType) },
  }),
});

// Endpoint for /laundry/room/<room_id>
// Returned by getLaundryRoom(room_id, details=false)
export const LaundryRoomsRoom = new GraphQLObjectType({
  name: "/laundry/rooms/room_id",
  fields: () => ({
    id: { type: GraphQLString },
    machines: { type: new GraphQLList(MachineType) },
  }),
});

// Endpoint for /laundry/room/<room_id>?get_status=true
// Returned by getLaundryRoom(room_id, details=true)
export const LaundryRoomsRoomDetailed = new GraphQLObjectType({
  name: "/laundry/rooms/room_id?get_status=true",
  fields: () => ({
    id: { type: GraphQLString },
    machines: { type: new GraphQLList(MachineDetailedType) },
  }),
});

//Endpoint for /laundry/room/<room_id>/machines/<machine_id>
// Returned by getLaundryMachine(room_id, machine_id, details=false)
export const LaundryRoomsRoomMachinesMachineId = new GraphQLObjectType({
  name: "/laundry/rooms/room/machines/machine_id",
  fields: () => ({
    result: { type: MachineType },
  }),
});

//Endpoint for /laundry/room/<room_id>/machines/<machine_id>?get_status=true
// Returned by getLaundryMachine(room_id, machine_id, details=true)
export const LaundryRoomsRoomMachinesMachineIdDetailed = new GraphQLObjectType({
  name: "/laundry/rooms/room/machines/machine_id?get_status=true",
  fields: () => ({
    result: { type: MachineDetailedType },
  }),
});
