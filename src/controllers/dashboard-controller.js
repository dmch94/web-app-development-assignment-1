// Dashboard Controller

// Import database
import { db } from "../models/db.js";

// Export - make it available for import to other app files
export const dashboardController = {
  // 1st action - display dashboard and runs
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const locations = await db.locationStore.getUserLocations(loggedInUser._id); 
      const viewData = {
        title: "SpotRun Dashboard",
        user: loggedInUser,
        locations: locations,
      };
      return h.view("dashboard", viewData);
    },
  },
  // 2nd action - display add location function
  addLocation: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newLocation = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.locationStore.addLocation(newLocation);
      return h.redirect("/dashboard");
    },
  },

  deleteLocation: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.locationStore.deleteLocationById(location._id);
      return h.redirect("/dashboard");
    },
  },

};