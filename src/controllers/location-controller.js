// Location Controller

// Import database
import { db } from "../models/db.js";

// Export - make it available for import to other app files
export const locationController = {
  index: {
    // 1. Display chosen location
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);  
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location", viewData);
    },
  },

  // 2. Add run to chosen location and redirect to chosen location page
  addRun: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newRun = {
        title: request.payload.title,
        distance: request.payload.distance,
        duration: Number(request.payload.duration),
      };
      await db.runStore.addRun(location._id, newRun);
      return h.redirect(`/location/${location._id}`);
    },
  },
};
