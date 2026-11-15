// Location Controller

// Import database
import { db } from "../models/db.js";
import { RunSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";

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
    validate: {
      payload: RunSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const location = await db.locationStore.getLocationById(request.params.id);
        return h.view("location", { title: "Add run error", location, errors: error.details }).takeover().code(400);
      },
    },
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

  // Delete run
  deleteRun: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.runStore.deleteRun(request.params.runid);
      return h.redirect(`/location/${location._id}`);
    },
  },

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
