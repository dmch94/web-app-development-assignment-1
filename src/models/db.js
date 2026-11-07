// Import mem stores 
import { userMemStore } from "./mem/user-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { runMemStore } from "./mem/run-mem-store.js";

// Export - make it available for import to other app files
export const db = {
  userStore: null,
  locationStore: null,
  runStore: null,

  // Initialise database
  init() {
    this.userStore = userMemStore;
    this.locationStore = locationMemStore;
    this.runStore = runMemStore;
  },
};