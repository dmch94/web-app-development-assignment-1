// Location Mem Store

// eslint-disable-next-line import/no-unresolved
import { v4 } from "uuid";
import { runMemStore } from "./run-mem-store.js";

// Create empty initial array
let locations = [];

// Export - make it available for import to other app files
export const locationMemStore = {

  // Return all locations in array
  async getAllLocations() {
    return locations;
  },

  // Add a location 
  async addLocation(location) {
    location._id = v4();    // Generates unique identifier
    locations.push(location);   // Add new location object to locations array    
    return locations;
  },

  // Find and return a location by ID
  async getLocationById(id) {
    // locations.find() searches locations array - provides individual location objects
    const foundLocation = locations.find((location) => location._id === id);   // => checks if each provided location object has correct ID - returns true/false 
    foundLocation.runs = await runMemStore.getRunsByLocationId(foundLocation._id);    // attaches associated runs to the found location object
    return foundLocation;
  },

  // Find and delete a location by ID
  async deleteLocationById(id) {
    const index = locations.findIndex((location) => location._id === id);
    locations.splice(index, 1);
  },

  async deleteAllLocations() {
    locations = [];
  },

  async getUserLocations(userid) {
    return locations.filter((location) => location.userid === userid);
  },

};