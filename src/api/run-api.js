import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { RunSpec, RunArray, IdSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const runApi = {
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
    description: "Get all runApi",
    notes: "Returns details of all runApi",
    response: { schema: RunArray, failAction: validationError },
  },

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
    description: "Create a Run",
    notes: "Returns the newly created run",
    validate: { payload: RunSpec, failAction: validationError },
    response: { schema: RunSpec, failAction: validationError },
  },

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
    description: "Delete all runApi",
    notes: "All runApi removed from SpotRun",
  },

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
    description: "Delete a specific runApi",
    notes: "Specific run removed from SpotRun",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
