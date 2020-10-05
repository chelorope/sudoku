const isBrowser = typeof window !== "undefined";

const GAME_SIZE = 9;

export const getInvalidValues = (values, [column, row]) => {
  const initialColumn = column - (column % 3);
  const initialRow = row - (row % 3);
  const invalid = [];
  for (let i = 0; i <= values.length - 1; i++) {
    for (let j = 0; j <= values[0].length - 1; j++) {
      if (
        values[i][j].number &&
        (i === column ||
          j === row ||
          (i >= initialColumn &&
            i <= initialColumn + 2 &&
            j >= initialRow &&
            j <= initialRow + 2)) &&
        invalid.indexOf(values[i][j].number) === -1
      ) {
        values[i][j] && invalid.push(values[i][j].number);
      }
    }
  }
  return invalid;
};

const getRandomInt = (min = 1, max = 9) => {
  const minAbs = Math.ceil(min);
  const maxAbs = Math.floor(max);
  return Math.floor(Math.random() * (maxAbs - minAbs + 1)) + minAbs;
};

export const generateRandomGame = (difficulty) => {
  let initialValuesCount;
  switch (difficulty) {
    case "evil":
      initialValuesCount = 17;
      break;
    case "hard":
      initialValuesCount = 23;
      break;
    case "medium":
      initialValuesCount = 29;
      break;
    case "easy":
      initialValuesCount = 37;
      break;

    default:
      initialValuesCount = 29;
      break;
  }
  const matrix = Array.from({ length: GAME_SIZE }, (_, i) => [
    ...Array.from({ length: GAME_SIZE }, (_, i) => ({
      number: undefined,
      isFixed: false,
    })),
  ]);
  for (let i = 0; i < initialValuesCount; i++) {
    let position;
    let isPositionInvalid = false;
    do {
      position = [getRandomInt(0, 8), getRandomInt(0, 8)];
      isPositionInvalid =
        typeof matrix[position[0]][position[1]].number !== "undefined";
    } while (isPositionInvalid);
    let value;
    let isValueInvalid;
    do {
      value = getRandomInt();
      isValueInvalid = getInvalidValues(matrix, position).indexOf(value) !== -1;
    } while (isValueInvalid);
    matrix[position[0]][position[1]] = { number: value, isFixed: true };
  }
  return matrix;
};

export const saveGameStatus = ({ values, difficulty }) => {
  values &&
    isBrowser &&
    window.localStorage.setItem("game-status-values", JSON.stringify(values));
  difficulty &&
    isBrowser &&
    window.localStorage.setItem("game-status-difficulty", difficulty);
};

export const getGameStatus = () => {
  // isBrowser && console.log(window.localStorage.getItem("game-status-values"));
  const values =
    (isBrowser &&
      JSON.parse(window.localStorage.getItem("game-status-values"))) ||
    generateRandomGame();
  const difficulty =
    isBrowser && window.localStorage.getItem("game-status-difficulty");
  return { values, difficulty };
};
