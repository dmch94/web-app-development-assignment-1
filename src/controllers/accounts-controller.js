// Accounts Controller | accounts-controller.js 
// Displays login/signup page and provides user registration, login, logout and authentication

// Imports
import { db } from "../models/db.js";   // database
import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";   // JOI schemas

// Creates and exports object
export const accountsController = {
  // 1. Display main welcome page 
  index: {
    auth: false,    // No login needed
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to SpotRun" });
    },
  },

  // 2. Registers new user
  signup: {
    auth: false,    // No login needed

    // Validate new user submissions against User schema 
    validate: {   
      payload: UserSpec,
      options: { abortEarly: false },

      // Prints validation errors to login/signup page
      failAction: function (request, h, error) {
        return h.view("main", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },

    // Creates account
    handler: async function (request, h) {
      const user = request.payload;
      await db.userStore.addUser(user);
      return h.redirect("/");
    },
  },

  // 3. Login a user
  login: {
    auth: false,    // No login needed
    
    // Validate user login submission against User schema 
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },

      // Prints validation errors to login/signup page
      failAction: function (request, h, error) {
        return h.view("main", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },

    // Checks for and logs in user
    handler: async function (request, h) {
      const { email, password } = request.payload;    // extract email and password
      const user = await db.userStore.getUserByEmail(email);    // search users by email
      if (!user || user.password !== password) {    // checks that user exists and password matches
        return h.redirect("/");   // fail
      }

      // Log in user
      request.cookieAuth.set({ id: user._id });     // create authenticated user session with cookie
      return h.redirect("/dashboard");
    },
  },

  // 4. Logout a user
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();   // Clear cookie - user session ended
      return h.redirect("/");
    },
  },

  // 5. Validate - check that current user session is valid
  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);    // find user by session id
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};

