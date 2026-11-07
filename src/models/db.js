// Import mem stores 
import { userMemStore } from "./mem/user-mem-store.js";
import { locationMemStore } from "./mem/location-mem-store.js";
import { runMemStore } from "./mem/run-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { runJsonStore } from "./json/run-json-store.js";

// Export - make it available for import to other app files
export const db = {
  userStore: null,
  locationStore: null,
  runStore: null,

  // Initialise database
  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.runStore = runJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.locationStore = locationMemStore;
        this.runStore = runMemStore;
    }
  },
};