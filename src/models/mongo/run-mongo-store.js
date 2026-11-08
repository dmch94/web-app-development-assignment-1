import Mongoose from "mongoose";
import { Run } from "./run.js";

export const runMongoStore = {
  async getAllRuns() {
    const runs = await Run.find().lean();
    return runs;
  },

  async addRun(locationId, run) {
    const newRun = new Run({
      ...run,
      locationid: locationId
    });
    const runObj = await newRun.save();
    return this.getRunById(runObj._id);
  },

  async getRunsByLocationId(id) {
    const runs = await Run.find({ locationid: id }).lean();
    return runs;
  },

  async getRunById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const run = await Run.findOne({ _id: id }).lean();
      return run;
    }
    return null;
  },

  async deleteRun(id) {
    try {
      await Run.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllRuns() {
    await Run.deleteMany({});
  },

  async updateRun(run, updatedRun) {
    const runDoc = await Run.findOne({ _id: run._id });
    runDoc.title = updatedRun.title;
    runDoc.distance = updatedRun.distance;
    runDoc.duration = updatedRun.duration;
    await runDoc.save();
  },
};