import * as toTest from "../logic/logic.js";

describe("test ships", () => {
  test("create 1 BlockShip", () => {
    expect(toTest.createShip(1)).toMatchObject({
      length: 1,
      hullHit: [0]
    });
  });
});

describe("test ships", () => {
  test("create 2 BlockShip", () => {
    expect(toTest.createShip(2)).toMatchObject({
      length: 2,
      hullHit: [0, 0]
    });
  });
});
