const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID
} = require("graphql");

/* ============= CAFE ENDPOINT TYPES =============
                /dining/cafes/<cafe_id>
    For cafe-specific information. Meals not included.
   ============= CAFE ENDPOINT TYPES ============= */

/**
 * DaypartType describes a dinings hall's operational schedule for a single meal of the day.
 */
const DaypartType = new GraphQLObjectType({
    name: "Daypart",
    fields: () => ({
        endtime: { type: GraphQLString },
        hide: { type: GraphQLString },
        id: { type: GraphQLString },
        label: { type: GraphQLString },
        message: { type: GraphQLString },
        starttime: { type: GraphQLString }
    })
});

/**
 * DayType describes the operational schedule of a dining hall for a single day.
 */
const DayType = new GraphQLObjectType({
    name: "Day",
    fields: () => ({
        date: { type: GraphQLString },
        dayparts: { type: new GraphQLList(DaypartType) },
        message: { type: GraphQLString },
        status: { type: GraphQLString }
    })
});

/**
 * CafeType describes a single dining hall, or cafe. It includes a description of the cafe, location information, and operational schedules.
 */
const CafeType = new GraphQLObjectType({
    name: "Cafe",
    fields: () => ({
        address : { type: GraphQLString },
        city : { type: GraphQLString },
        days : { type: new GraphQLList(DayType) },
        description : { type: GraphQLString },
        eod : { type: GraphQLString },
        id : { type: GraphQLID },
        latitude : { type: GraphQLString },
        location_detail : { type: GraphQLString },
        longitude : { type: GraphQLString },
        menu_html : { type: GraphQLString },
        menu_type : { type: GraphQLString },
        message : { type: GraphQLString },
        name : { type: GraphQLString },
        state : { type: GraphQLString },
        weekly_schedule : { type: GraphQLString },
        zip : { type: GraphQLString }
    })
});

/* ============= MENU ENDPOINT TYPES =============
            /dining/cafes/<cafe_id>/menu
        For cafe-specific meal information.
   ============= MENU ENDPOINT TYPES ============= */

/**
 * ItemType describes a single food item, including a description and dietary traits.
 */
const ItemType = new GraphQLObjectType({
    name: "item",
    fields: () => ({
        description: { type: GraphQLString },
        gluten_free: { type: GraphQLBoolean },
        halal: { type: GraphQLBoolean },
        id: { type: GraphQLString },
        kosher: { type: GraphQLBoolean },
        name: { type: GraphQLString },
        vegan: { type: GraphQLBoolean },
        vegetarian: { type: GraphQLBoolean }
    })
});

/**
 * StationType describes a food station, including all the foods being served at that station.
 */
const StationType = new GraphQLObjectType({
    name: "station",
    fields: () => ({
        id: { type: GraphQLString },
        image: { type: GraphQLString },
        items: { type: new GraphQLList(ItemType) },
        label: { type: GraphQLString },
        note: { type: GraphQLString },
        order_id: { type: GraphQLString },
        price: { type: GraphQLString },
        soup: { type: GraphQLInt }
    })
});

/**
 * DaypartType describes the menu for a single meal of the day at a dining cafe.
 */
const MealType = new GraphQLObjectType({
    name: "meal",
    fields: () => ({
        abbreviation : { type: GraphQLString },
        endtime : { type: GraphQLString },
        id : { type: GraphQLString },
        label : { type: GraphQLString },
        message : { type: GraphQLString },
        starttime : { type: GraphQLString },
        stations : { type: new GraphQLList(StationType) }
    })
});

/**
 * MenuType describes a dining hall's menu for one entire day.
 */
const MenuType = new GraphQLObjectType({
    name: "menu",
    fields: () => ({
        dayparts: { type: new GraphQLList(MealType) },
        cafe_id: { type: GraphQLID },
        menu_id: { type: GraphQLString },
        name: { type: GraphQLString }
    })
});

module.exports = {
    MenuType: MenuType,
    CafeType: CafeType,
};
