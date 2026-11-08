import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testLocations, testRuns, beethoven, mozart, concerto, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Run Model tests", () => {

  let beethovenList = null;

  setup(async () => {
    db.init("mongo");
    await db.locationStore.deleteAllLocations();
    await db.runStore.deleteAllRuns();
    beethovenList = await db.locationStore.addLocation(beethoven);
    for (let i = 0; i < testRuns.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testRuns[i] = await db.runStore.addRun(beethovenList._id, testRuns[i]);
    }
  });

  test("create single run", async () => {
    const mozartList = await db.locationStore.addLocation(mozart);
    const run = await db.runStore.addRun(mozartList._id, concerto)
    assert.isNotNull(run._id);
    assertSubset (concerto, run);
  });

  test("get multiple runs", async () => {
    const runs = await db.runStore.getRunsByLocationId(beethovenList._id);
    assert.equal(runs.length, testRuns.length)
  });

  test("delete all runs", async () => {
    const runs = await db.runStore.getAllRuns();
    assert.equal(testRuns.length, runs.length);
    await db.runStore.deleteAllRuns();
    const newRuns = await db.runStore.getAllRuns();
    assert.equal(0, newRuns.length);
  });

  test("get a run - success", async () => {
    const mozartList = await db.locationStore.addLocation(mozart);
    const run = await db.runStore.addRun(mozartList._id, concerto)
    const newRun = await db.runStore.getRunById(run._id);
    assertSubset (concerto, newRun);
  });

  test("delete One Run - success", async () => {
    await db.runStore.deleteRun(testRuns[0]._id);
    const runs = await db.runStore.getAllRuns();
    assert.equal(runs.length, testLocations.length - 1);
    const deletedRun = await db.runStore.getRunById(testRuns[0]._id);
    assert.isNull(deletedRun);
  });

  test("get a run - bad params", async () => {
    assert.isNull(await db.runStore.getRunById(""));
    assert.isNull(await db.runStore.getRunById());
  });

  test("delete one run - fail", async () => {
    await db.runStore.deleteRun("bad-id");
    const runs = await db.runStore.getAllRuns();
    assert.equal(runs.length, testLocations.length);
  });
});
