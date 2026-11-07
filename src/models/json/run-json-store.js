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
    let foundRuns = db.data.runs.filter((run) => run.locationid === id);
    if (!foundRuns) {
      foundRuns = null;
    }
    return foundRuns;
  },

  async getRunById(id) {
    await db.read();
    let foundRun = db.data.runs.find((run) => run._id === id);
    if (!foundRun) {
      foundRun = null;
    }
    return foundRun;
  },

  async getLocationRuns(locationId) {
    await db.read();
    let foundRuns = runs.filter((run) => run.locationid === locationId);
    if (!foundRuns) {
      foundRuns = null;
    }
    return foundRuns;
  },

  async deleteRun(id) {
    await db.read();
    const index = db.data.runs.findIndex((run) => run._id === id);
    if (index !== -1) db.data.runs.splice(index, 1);
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
