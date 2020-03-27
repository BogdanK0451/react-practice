const BOATCOUNT = 4;
const SHIPCOUNT = 3;
const SUBMARINE = 2;
const CRUISER = 1;

export function createShip(length) {
  let hullHit = [];
  hullHit.length = length;
  hullHit.fill(0);

  let orientation = Math.round(Math.random()) ? "v" : "h";

  function hit(pos) {
    hullHit[pos] = 1;
  }
  function isSunk() {
    return hullHit.every(hull => hull === 1);
  }

  return {
    length,
    orientation,
    hullHit,
    hit,
    isSunk
  };
}

export function createFleet() {
  return {
    boat1: createShip(1),
    boat2: createShip(1),
    boat3: createShip(1),
    boat4: createShip(1),
    ship1: createShip(2),
    ship2: createShip(2),
    ship3: createShip(2),
    submarine1: createShip(3),
    submarine2: createShip(3),
    cruiser1: createShip(4)
  };
}

export function createGameBoard(fleet) {
  let board = Array(10)
    .fill(null)
    .map(function() {
      return Array(10).fill(0);
    }); //Array(10).fill(Array(10).fill(0));        https://stackoverflow.com/questions/37949813/array-fillarray-creates-copies-by-references-not-by-value
  let randVals = [];

  for (let i = 0; i < 100; i++) {
    randVals.push(i);
  }
  for (const ship in fleet) {
    if (fleet.hasOwnProperty(ship)) {
      randomlyPositionShip(fleet[ship]);
    }
  }

  function randomlyPositionShip(ship) {
    if (ship.length > 1)
      randVals = removeInvalidPositions(randVals, ship.length);

    let rand = randVals[Math.floor(Math.random() * randVals.length)];

    if (ship.orientation === "v") {
      let x = rand % 10;
      let y = Math.floor(rand / 10);

      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = 1;
      }
    } else if (ship.orientation === "h") {
      let x = rand % 10;
      let y = Math.floor(rand / 10);

      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = 1;
      }
    }
  }
  console.log(randVals);
  console.log(board);
}

function findAndRemoveNeighbours(x, y, shipSize, shipOrientation) {
  let invalidPos = [];

  //removing locations where a ship already is from the set of possible locations where next ship will be
  for (let i = 0; i < shipSize; i++)
    if (shipOrientation === "v") {
      invalidPos.push(x * 10 + y + i);
    }
}

function removeInvalidPositions(randVals, shipLength) {
  let size2InvalidPos = [
    99,
    98,
    97,
    96,
    95,
    94,
    93,
    92,
    91,
    90,
    9,
    19,
    29,
    39,
    49,
    59,
    69,
    79,
    89
  ];
  let size3InvalidPos = [
    88,
    87,
    86,
    85,
    84,
    83,
    82,
    81,
    80,
    8,
    18,
    28,
    38,
    48,
    58,
    68,
    78
  ];
  let size4InvalidPos = [
    77,
    76,
    75,
    74,
    73,
    72,
    71,
    70,
    7,
    17,
    27,
    37,
    47,
    57,
    67
  ];
  switch (shipLength) {
    case 2:
      randVals = randVals.filter(i => size2InvalidPos.indexOf(i) === -1);
      break;
    case 3:
      randVals = randVals.filter(i => size3InvalidPos.indexOf(i) === -1);
      break;
    case 4:
      randVals = randVals.filter(i => size4InvalidPos.indexOf(i) === -1);
      break;
  }
  return randVals;
}
