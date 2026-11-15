import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { LocationSpec, LocationArray, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const locationApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all locations",
    notes: "Returns details of all locations",
    response: { schema: LocationArray, failAction: validationError },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific location",
    notes: "Returns location details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: LocationSpec, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const location = request.payload;
        const newLocation = await db.locationStore.addLocation(location);
        if (newLocation) {
          return h.response(newLocation).code(201);
        }
        return Boom.badImplementation("error creating location");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Location",
    notes: "Returns the newly created location",
    validate: { payload: LocationSpec, failAction: validationError },
    response: { schema: LocationSpec, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        if (!location) {
          return Boom.notFound("No Location with this id");
        }
        await db.locationStore.deleteLocationById(location._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    tags: ["api"],
    description: "Delete a specific location",
    notes: "Specific location removed from SpotRun",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteAllLocations();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all locations",
    notes: "All locations removed from SpotRun",
  },
};
