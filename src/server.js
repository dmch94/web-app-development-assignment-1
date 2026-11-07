// Import resources
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Joi from "joi";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";


// Establish location of server.js and starting point for locating other files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check for .env file
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

// Function for creating Hapi server
async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  // Register Vision plugin
  await server.register(Vision);

  // Register Cookie
  await server.register(Cookie);

  server.validator(Joi);

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  // Establish Handlebars, and set locations of views, layouts, partials files
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,   // enables layouts
    isCached: false,    // disables cache
  });

  // Initialise database
  db.init();


  server.route(webRoutes);

  // Start server once Hapi has started
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

// Run the function
init();