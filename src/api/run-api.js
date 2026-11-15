// Run API - run-api.js 
// Retrieves, creates, deletes runs 

// Imports
import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { RunSpec, RunArray, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

// See location-api.js for full comments


export const runApi = {
  
  // 1. Find all runs
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const runs = await db.runStore.getAllRuns();
        return runs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all runs",
    notes: "Returns details of all runs",
    response: { schema: RunArray, failAction: validationError },
  },

  // 2. Find a specific run
  findOne: {
    auth: false,
    async handler(request) {
      try {
        const run = await db.runStore.getRunById(request.params.id);
        if (!run) {
          return Boom.notFound("No run with this id");
        }
        return run;
      } catch (err) {
        return Boom.serverUnavailable("No run with this id");
      }
    },
    tags: ["api"],
    description: "Get a specific run",
    notes: "Returns run details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: RunSpec, failAction: validationError },
  },

  // 3. Create a run
  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const run = await db.runStore.addRun(request.params.id, request.payload);
        if (run) {
          return h.response(run).code(201);
        }
        return Boom.badImplementation("error creating run");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a run",
    notes: "Returns the newly created run",
    validate: { payload: RunSpec, failAction: validationError },
    response: { schema: RunSpec, failAction: validationError },
  },

  // 4. Delet all runs
  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.runStore.deleteAllRuns();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all runs",
    notes: "All runs removed from SpotRun",
  },

  // 5. Delete a single specific run
  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const run = await db.runStore.getRunById(request.params.id);
        if (!run) {
          return Boom.notFound("No Run with this id");
        }
        await db.runStore.deleteRun(run._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Run with this id");
      }
    },
    tags: ["api"],
    description: "Delete a specific run",
    notes: "Specific run removed from SpotRun",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
