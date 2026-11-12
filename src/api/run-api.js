import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
  },
};
