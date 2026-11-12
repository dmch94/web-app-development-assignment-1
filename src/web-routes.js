// Import controllers
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { locationController } from "./controllers/location-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";


// Export web routes - make available to other files
// GET routes - retrieve or display info 
// POST routes - submmit info
export const webRoutes = [
    
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },
  
    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "GET", path: "/about", config: aboutController.index },
    { method: "GET", path: "/location/{id}", config: locationController.index },
    
    { method: "POST", path: "/dashboard/addlocation", config: dashboardController.addLocation },
    { method: "POST", path: "/location/{id}/addrun", config: locationController.addRun },

    { method: "GET", path: "/dashboard/deletelocation/{id}", config: dashboardController.deleteLocation },
    { method: "GET", path: "/location/{id}/deleterun/{runid}", config: locationController.deleteRun },

    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }


];
