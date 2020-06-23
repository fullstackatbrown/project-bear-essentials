const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLList } = require("graphql");

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

const {
    CafeType,
    MenuType,
} = require("./dining/diningSchemas");

const {
    getCafe,
    getCafes,
    getMenu,
    getMenus,
    getMenuOnDays
} = require("./dining/diningQueries");

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        laundryRooms: {
            type: LaundryRooms,
            resolve() {
                return getLaundryRooms();
            },
        },
        laundryRoom: {
            type: LaundryRoom,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return getLaundryRoom(args.id, false);
            },
        },
        laundryRoomDetailed: {
            type: LaundryRoomDetailed,
            args: { id: { type: GraphQLID } },
            resolve(_, args) {
                return getLaundryRoom(args.id, true);
            },
        },
        laundryMachine: {
            type: LaundryMachine,
            args: { id: { type: GraphQLID }, machineId: { type: GraphQLID } },
            resolve(_, args) {
                return getLaundryMachine(args.id, args.machineId, false);
            },
        },
        laundryMachineDetailed: {
            type: LaundryMachineDetailed,
            args: { id: { type: GraphQLID }, machineId: { type: GraphQLID } },
            resolve(_, args) {
                return getLaundryMachine(args.id, args.machineId, true);
            },
        },
        cafe: {
            type: CafeType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return getCafe(args.id);
            }
        },
        cafes: {
            type: new GraphQLList(CafeType),
            resolve() {
                return getCafes();
            }
        },
        menu: {
            type: MenuType,
            args: { id: { type: GraphQLString } },
            resolve(_, args) {
                return getMenu(args.id);
            }
        },
        menus: {
            type: new GraphQLList(MenuType),
            resolve() {
                return getMenus();
            }
        },
        menusOnDays: {
            type: new GraphQLList(MenuType),
            args: { id: { type: GraphQLString }, dates: { type: new GraphQLList(GraphQLString) } },
            resolve(_, args) {
                return getMenuOnDays(args.id, args.dates);
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQueryType,
});
