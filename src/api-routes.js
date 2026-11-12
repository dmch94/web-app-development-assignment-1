import { userApi } from "./api/user-api.js";
import { locationApi } from "./api/location-api.js";
import { runApi } from "./api/run-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/locations", config: locationApi.create },
  { method: "DELETE", path: "/api/locations", config: locationApi.deleteAll },
  { method: "GET", path: "/api/locations", config: locationApi.find },
  { method: "GET", path: "/api/locations/{id}", config: locationApi.findOne },
  { method: "DELETE", path: "/api/locations/{id}", config: locationApi.deleteOne },

  { method: "GET", path: "/api/runs", config: runApi.find },
  { method: "GET", path: "/api/runs/{id}", config: runApi.findOne },
  { method: "POST", path: "/api/locations/{id}/runs", config: runApi.create },
  { method: "DELETE", path: "/api/runs", config: runApi.deleteAll },
  { method: "DELETE", path: "/api/runs/{id}", config: runApi.deleteOne },
];
