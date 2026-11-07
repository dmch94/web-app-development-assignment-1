import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const runJsonStore = {
  async getAllRuns() {
    await db.read();
    return db.data.runs;
  },

  async addRun(locationId, run) {
    await db.read();
    run._id = v4();
    run.locationid = locationId;
    db.data.runs.push(run);
    await db.write();
    return run;
  },

  async getRunsByLocationId(id) {
    await db.read();
    return db.data.runs.filter((run) => run.locationid === id);
  },

  async getRunById(id) {
    await db.read();
    return db.data.runs.find((run) => run._id === id);
  },

  async deleteRun(id) {
    await db.read();
    const index = db.data.runs.findIndex((run) => run._id === id);
    db.data.runs.splice(index, 1);
    await db.write();
  },

  async deleteAllRuns() {
    db.data.runs = [];
    await db.write();
  },

  async updateRun(run, updatedRun) {
    run.title = updatedRun.title;
    run.artist = updatedRun.artist;
    run.duration = updatedRun.duration;
    await db.write();
  },
};
