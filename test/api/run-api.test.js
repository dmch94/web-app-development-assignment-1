import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { spotrunService } from "./spotrun-service.js";
import { singleUserTest, mainTestLocation, testLocations, testRuns, singleRunTest } from "../fixtures.js";

suite("Run API tests", () => {
  let user = null;
  let locationTest = null;

  setup(async () => {
    await spotrunService.deleteAllLocations();
    await spotrunService.deleteAllUsers();
    await spotrunService.deleteAllRuns();
    user = await spotrunService.createUser(singleUserTest);
    mainTestLocation.userid = user._id;
    locationTest = await spotrunService.createLocation(mainTestLocation);
  });

  teardown(async () => {});

  test("create run", async () => {
    const returnedRun = await spotrunService.createRun(locationTest._id, singleRunTest);
    assertSubset(singleRunTest, returnedRun);
  });

  test("create Multiple runs", async () => {
    for (let i = 0; i < testRuns.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await spotrunService.createRun(locationTest._id, testRuns[i]);
    }
    const returnedRuns = await spotrunService.getAllRuns();
    assert.equal(returnedRuns.length, testRuns.length);
    for (let i = 0; i < returnedRuns.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const run = await spotrunService.getRun(returnedRuns[i]._id);
      assertSubset(run, returnedRuns[i]);
    }
  });

  test("Delete RunApi", async () => {
    for (let i = 0; i < testRuns.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await spotrunService.createRun(locationTest._id, testRuns[i]);
    }
    let returnedRuns = await spotrunService.getAllRuns();
    assert.equal(returnedRuns.length, testRuns.length);
    for (let i = 0; i < returnedRuns.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const run = await spotrunService.deleteRun(returnedRuns[i]._id);
    }
    returnedRuns = await spotrunService.getAllRuns();
    assert.equal(returnedRuns.length, 0);
  });

  test("denormalised location", async () => {
    for (let i = 0; i < testRuns.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await spotrunService.createRun(locationTest._id, testRuns[i]);
    }
    const returnedLocation = await spotrunService.getLocation(locationTest._id);
    assert.equal(returnedLocation.runs.length, testRuns.length);
    for (let i = 0; i < testRuns.length; i += 1) {
      assertSubset(testRuns[i], returnedLocation.runs[i]);
    }
  });
});
