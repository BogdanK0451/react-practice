import {
  FREE,
  TAKEN,
  BOARDWIDTH,
  BOARDHEIGHT,
  NORMAL_CELL,
  NEARBY_CELL
} from "../logic/const.js";

export function createShip(length) {
  let hits = 0;

  let orientation = Math.round(Math.random()) ? "v" : "h";

  function hit() {
    hits++;
  }
  function isSunk() {
    return hits === length;
  }
  function hitsTaken() {
    return hits;
  }

  return {
    length,
    orientation,
    hitsTaken,
    hit,
    isSunk
  };
}

export function createFleet() {
  let fleet = {
    cruiser1: createShip(4),
    submarine1: createShip(3),
    submarine2: createShip(3),
    ship1: createShip(2),
    ship2: createShip(2),
    ship3: createShip(2),
    boat1: createShip(1),
    boat2: createShip(1),
    boat3: createShip(1),
    boat4: createShip(1)
  };
  let fleetShipCount = Object.keys(fleet).length;

  function sinkOneShip() {
    fleetShipCount--;
  }
  function isFleetDestroyed() {
    if (fleetShipCount === 0) return true;
    else return false;
  }

  return {
    sinkOneShip,
    isFleetDestroyed,
    ...fleet
  };
}

export function createGameBoard(fleet) {
  let board = Array(10)
    .fill(null)
    .map(function() {
      return Array(10).fill(FREE + ";open;" + NORMAL_CELL + ";none");
    }); //Array(10).fill(Array(10).fill(0));        https://stackoverflow.com/questions/37949813/array-fillarray-creates-copies-by-references-not-by-value
  let randVals = [];

  for (let i = 0; i < 100; i++) {
    randVals.push(i);
  }
  for (const ship in fleet) {
    if (fleet.hasOwnProperty(ship) && typeof fleet[ship] !== "function") {
      randomlyPositionShip(fleet[ship], ship);
    }
  }

  function randomlyPositionShip(ship, shipName) {
    function markShipOnBoard(shipCords) {
      for (let i = 0; i < shipCords.length; i++) {
        board[shipCords[i][0]][shipCords[i][1]] =
          TAKEN + ";open;" + NORMAL_CELL + ";" + shipName;
      }
    }
    function markShipNeighborsOnBoard(neighborCords) {
      for (let i = 0; i < neighborCords.length; i++) {
        if (
          board[neighborCords[i][0]][neighborCords[i][1]].split(";")[2] ===
          NEARBY_CELL
        )
          board[neighborCords[i][0]][neighborCords[i][1]] += shipName;
        else
          board[neighborCords[i][0]][neighborCords[i][1]] =
            FREE + ";open;" + NEARBY_CELL + ";" + shipName;
      }
    }
    function rmvShipPosFromPool() {
      let invalidPos = [];
      let shipCords = [];

      if (ship.orientation === "v") {
        for (let i = 0; i < ship.length; i++) {
          shipCords.push([Math.floor(rand / 10) + i, rand % 10]);
        }
      } else if (ship.orientation === "h") {
        for (let i = 0; i < ship.length; i++) {
          shipCords.push([Math.floor(rand / 10), (rand % 10) + i]);
        }
      }
      invalidPos = shipCords.map(elem => elem[0] * 10 + elem[1]);
      randVals = randVals.filter(i => invalidPos.indexOf(i) === -1);
      return shipCords;
    }
    function rmvNeighborsPosFromPool() {
      let invalidPos = [];
      let x = rand % 10;
      let y = Math.floor(rand / 10);
      let neighborsCords = [];

      if (ship.orientation === "v") {
        if (y - 1 >= 0) {
          if (x - 1 >= 0) {
            neighborsCords.push([y - 1, x - 1]);
          }
          neighborsCords.push([y - 1, x]);
          if (x + 1 <= BOARDWIDTH - 1) {
            neighborsCords.push([y - 1, x + 1]);
          }
        }

        for (let i = 0; i < ship.length; i++) {
          if (x - 1 >= 0) {
            neighborsCords.push([y + i, x - 1]);
          }
          if (x + 1 <= BOARDWIDTH - 1) {
            neighborsCords.push([y + i, x + 1]);
          }
        }

        if (y + ship.length <= BOARDHEIGHT - 1) {
          if (x - 1 >= 0) {
            neighborsCords.push([y + ship.length, x - 1]);
          }
          neighborsCords.push([y + ship.length, x]);
          if (x + 1 <= BOARDWIDTH - 1) {
            neighborsCords.push([y + ship.length, x + 1]);
          }
        }
      }
      if (ship.orientation === "h") {
        if (x - 1 >= 0) {
          if (y - 1 >= 0) {
            neighborsCords.push([y - 1, x - 1]);
          }
          neighborsCords.push([y, x - 1]);
          if (y + 1 <= BOARDHEIGHT - 1) {
            neighborsCords.push([y + 1, x - 1]);
          }
        }

        for (let i = 0; i < ship.length; i++) {
          if (y - 1 >= 0) {
            neighborsCords.push([y - 1, x + i]);
          }
          if (y + 1 <= BOARDHEIGHT - 1) {
            neighborsCords.push([y + 1, x + i]);
          }
        }

        if (x + ship.length <= BOARDWIDTH - 1) {
          if (y - 1 >= 0) {
            neighborsCords.push([y - 1, x + ship.length]);
          }
          neighborsCords.push([y, x + ship.length]);
          if (y + 1 <= BOARDHEIGHT - 1) {
            neighborsCords.push([y + 1, x + ship.length]);
          }
        }
      }
      invalidPos = neighborsCords.map(elem => elem[0] * 10 + elem[1]);
      randVals = randVals.filter(i => invalidPos.indexOf(i) === -1);
      return neighborsCords;
    }
    let rand;
    let fail = false;
    if (ship.orientation === "v") {
      do {
        fail = false;
        rand = randVals[Math.floor(Math.random() * randVals.length)];

        if (Math.floor(rand / 10) + ship.length - 1 > 9) fail = true;
        else
          for (let i = 0; i < ship.length; i++)
            fail =
              fail ||
              board[Math.floor(rand / 10) + i][rand % 10].split(";")[3] !==
                "none";
      } while (fail);
    } else if (ship.orientation === "h") {
      do {
        fail = false;
        rand = randVals[Math.floor(Math.random() * randVals.length)];

        if ((rand % 10) + ship.length - 1 > 9) fail = true;
        else
          for (let i = 0; i < ship.length; i++)
            fail =
              fail ||
              board[Math.floor(rand / 10)][(rand % 10) + i].split(";")[3] !==
                "none";
      } while (fail);
    }
    let shipCords = rmvShipPosFromPool();
    markShipOnBoard(shipCords);
    let shipNeighborsCords = rmvNeighborsPosFromPool();
    markShipNeighborsOnBoard(shipNeighborsCords);
  }
  return board;
}

export function createPlayer(name, fleet, board) {
  return {
    name,
    fleet,
    board,
    lastClickedCell: undefined
  };
}
