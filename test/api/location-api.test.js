// Import resources
import { EventEmitter } from "events";
import { assert } from "chai";
import { spotrunService } from "./spotrun-service.js";
import { assertSubset } from "../test-utils.js";
import { singleUserTest, mainTestLocation, testLocations } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Location API tests", () => {
  let user = null;

  // Clear databases and create test user
  setup(async () => {
    await spotrunService.deleteAllLocations();
    await spotrunService.deleteAllUsers();
    user = await spotrunService.createUser(singleUserTest);
    mainTestLocation.userid = user._id;
  });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await spotrunService.createLocation(mainTestLocation);
    assert.isNotNull(returnedLocation);
    assertSubset(mainTestLocation, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await spotrunService.createLocation(mainTestLocation);
    const response = await spotrunService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await spotrunService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocations.length; i += 1) {
      testLocations[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await spotrunService.createLocation(testLocations[i]);
    }
    let returnedLists = await spotrunService.getAllLocations();
    assert.equal(returnedLists.length, testLocations.length);
    await spotrunService.deleteAllLocations();
    returnedLists = await spotrunService.getAllLocations();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existent location", async () => {
    try {
      const response = await spotrunService.deleteLocation("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });
});
