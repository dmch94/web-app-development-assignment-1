// Sends requests to API (user-api.js) when called by application
// Returns data to the application

// Import Resources
import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const spotrunService = {
  spotrunUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.spotrunUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.spotrunUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.spotrunUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.spotrunUrl}/api/users`);
    return res.data;
  },

  async createLocation(location) {
    const res = await axios.post(`${this.spotrunUrl}/api/locations`, location);
    return res.data;
  },

  async deleteAllLocations() {
    const response = await axios.delete(`${this.spotrunUrl}/api/locations`);
    return response.data;
  },

  async deleteLocation(id) {
    const response = await axios.delete(`${this.spotrunUrl}/api/locations/${id}`);
    return response;
  },

  async getAllLocations() {
    const res = await axios.get(`${this.spotrunUrl}/api/locations`);
    return res.data;
  },

  async getLocation(id) {
    const res = await axios.get(`${this.spotrunUrl}/api/locations/${id}`);
    return res.data;
  },

    async createRun(id, run) {
    const res = await axios.post(`${this.spotrunUrl}/api/locations/${id}/runs`, run);
    return res.data;
  },

  async deleteAllRuns() {
    const response = await axios.delete(`${this.spotrunUrl}/api/runs`);
    return response.data;
  },

  async deleteRun(id) {
    const response = await axios.delete(`${this.spotrunUrl}/api/runs/${id}`);
    return response;
  },

  async getAllRuns() {
    const res = await axios.get(`${this.spotrunUrl}/api/runs`);
    return res.data;
  },

  async getRun(id) {
    const res = await axios.get(`${this.spotrunUrl}/api/runs/${id}`);
    return res.data;
  },
};
