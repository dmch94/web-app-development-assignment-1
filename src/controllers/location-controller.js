// Location Controller | location-controller.js

// Imports
import { db } from "../models/db.js";
import { RunSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

// Creates and exports object
export const locationController = {
  // 1. Display chosen location
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location", viewData);
    },
  },

  // 2. Add run to chosen location
  addRun: {
    
    // Validate run info
    validate: {
      payload: RunSpec,   // Check against Joi schema
      options: { abortEarly: false },

      // If failed reload page with erro messages
      failAction: async function (request, h, error) {
        const location = await db.locationStore.getLocationById(request.params.id);
        return h.view("location", { title: "Add run error", location, errors: error.details }).takeover().code(400);
      },
    },

    // Add Run
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

  // 3. Delete run
  deleteRun: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.runStore.deleteRun(request.params.runid);
      return h.redirect(`/location/${location._id}`);
    },
  },

  // 4. Upload location image
  uploadImage: {
    handler: async function (request, h) {
      try {
        const location = await db.locationStore.getLocationById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          location.img = url;
          await db.locationStore.updateLocation(location);
        }
        return h.redirect(`/location/${location._id}`);
      } catch (err) {
        console.log(err);
        // eslint-disable-next-line no-restricted-globals
        return h.redirect(`/location/${location._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};
