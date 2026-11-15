// Main Controller 

// Creates and exports object
export const mainController = {
  index: {
    // request = object with request info, h = object for accessing views 
    handler: async function (request, h) {   
      return h.view("main");  // Find and return view named main
    },
  },
};