// Dashboard Controller | accounts-controller.js
// Displays dashboard and provides add/delete location

// Import database
import { db } from "../models/db.js";
import { LocationSpec } from "../models/joi-schemas.js";

// Creates and exports object
export const dashboardController = {
  // 1. Display dashboard and runs
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials; // Check logged in
      const locations = await db.locationStore.getUserLocations(loggedInUser._id); // Find only user's locations
      const viewData = {
        title: "SpotRun Dashboard",
        user: loggedInUser,
        locations: locations,
      };
      return h.view("dashboard", viewData); // Display dashboard with user's locations
    },
  },

  // 2. Display add location form and validate/save new locations
  addLocation: {
    // Validate inputted location data
    validate: {
      payload: LocationSpec, // Check against Locations Schema
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials; // Retrieve logged in user credentials
        const locations = await db.locationStore.getUserLocations(loggedInUser._id); // Finds session user's locations to be re-displayed

        // Display dashboard but with errors
        return h
          .view("dashboard", {
            title: "Add Location error",
            locations,
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },

    // Save new location
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials; // Retrieve details

      // Create new location object
      const newLocation = {
        userid: loggedInUser._id,
        title: request.payload.title,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
      };
      await db.locationStore.addLocation(newLocation); // Save
      return h.redirect("/dashboard");
    },
  },

  // 3. Delete location from dashboard 
  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect("/dashboard");
    },
  },
};
