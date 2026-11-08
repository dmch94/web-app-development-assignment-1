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
};
