// Run Mem Store

// eslint-disable-next-line import/no-unresolved
import { v4 } from "uuid";

// Create empty initial array
let runs = [];

// Export - make it available for import to other app files
export const runMemStore = {
  async getAllRuns() {
    return runs;
  },

  // Add a new run
  async addRun(locationId, run) {
    run._id = v4();   // Assign unique ID
    run.locationId = locationId;    // Attach new ID to run
    runs.push(run);   // Add run to runs array
    return run;
  },

  // Find run by location ID
  async getRunsByLocationId(id) {
    return runs.filter((run) => run.locationId === id);   // Find all runs (filter) where the run location ID matches the inputted ID 
  },

  // Find run by ID
  async getRunById(id) {
    let foundRun = runs.find((run) => run._id === id);
    if (!foundRun) {
      foundRun = null;
    }
    return foundRun;
  },

  // Find all runs from a location of a certain ID
  async getLocationRuns(locationId) {
    let foundRuns = runs.filter((run) => run.locationid === locationId);
    if (!foundRuns) {
      foundRuns = null;
    }
    return foundRuns;
  },

  // Delete run
  async deleteRun(id) {
    const index = runs.findIndex((run) => run._id === id);
    if (index !== -1) runs.splice(index, 1);
  },

  // Delete all runs
  async deleteAllRuns() {
    runs = [];
  },

  // Update existing run
  async updateRun(run, updatedRun) {
    run.title = updatedRun.runner;
    run.artist = updatedRun.distance;
    run.duration = updatedRun.duration;
  },
};
