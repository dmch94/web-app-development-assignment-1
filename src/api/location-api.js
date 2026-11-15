// Location API - location-api.js 
// Retrieves, creates, deletes locations 

// Imports
import Boom from "@hapi/boom";  // HTTP Error responses
import { db } from "../models/db.js";   // Database
import { LocationSpec, LocationArray, IdSpec } from "../models/joi-schemas.js";   // JOI Schema
import { validationError } from "./logger.js";  // Error handling

// Creates and exports object
export const locationApi = {
  
  // 1. Find all locations
  find: {
    auth: false,    // No login needed
    handler: async function (request, h) {
      try {
        const locations = await db.locationStore.getAllLocations();   // Get all locations from db - save to variable
        return locations;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // Swagger API Annotations
    tags: ["api"],
    description: "Get all locations",
    notes: "Returns details of all locations",
    response: { schema: LocationArray, failAction: validationError },   // Check returned data has correct structure
  },

  // 2. Find a specific location
  findOne: {
    auth: false,    // No login needed
    async handler(request) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);   // Get specific location from db - save to variable 
        if (!location) {
          return Boom.notFound("No Location with this id");   // Check it exists
        }
        return location;
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    // Swagger API Annotations
    tags: ["api"],
    description: "Get a specific location",
    notes: "Returns location details",
    validate: { params: { id: IdSpec }, failAction: validationError },    // Checks supplied ID is correct format
    response: { schema: LocationSpec, failAction: validationError },    // Check returned data has correct structure
  },

  // 3. Create a location
  create: {
    auth: false,    // No login needed
    handler: async function (request, h) {
      try {
        const location = request.payload;   // All data submitted in request
        const newLocation = await db.locationStore.addLocation(location);   // Add new location
        if (newLocation) {
          return h.response(newLocation).code(201);   // Success
        }
        return Boom.badImplementation("error creating location");   // Error
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // Swagger API Annotations
    tags: ["api"],
    description: "Create a Location",
    notes: "Returns newly created location",
    validate: { payload: LocationSpec, failAction: validationError },   // Check inputted data has correct structure
    response: { schema: LocationSpec, failAction: validationError },    // Check returned data has correct structure
  },

  // 4. Delete specific location
  deleteOne: {
    auth: false,    // No login needed
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);   // Get specific location from db - save to variable 
        if (!location) {
          return Boom.notFound("No Location with this id");   // Check it exists
        }
        await db.locationStore.deleteLocationById(location._id);    // Delete location matching ID once found 
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Location with this id");
      }
    },
    // Swagger API Annotations
    tags: ["api"],
    description: "Delete a specific location",
    notes: "Specific location removed from SpotRun",
    validate: { params: { id: IdSpec }, failAction: validationError },     // Checks supplied ID is correct format
  },

  // 5. Delete all locations
  deleteAll: {
    auth: false,    // No login needed
    handler: async function (request, h) {
      try {
        await db.locationStore.deleteAllLocations();    // Delete all locations 
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    // Swagger API Annotations
    tags: ["api"],
    description: "Delete all locations",
    notes: "All locations removed from SpotRun",
  },
};
