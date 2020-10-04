import React, { memo, useEffect, useState } from "react";

import Grid from "../Grid/Grid";
import Selector from "../Selector/Selector";

import styles from "./Game.module.css";

const SIZE = 9;
const INITIAL_NUMBERS_COUNT = 10;

const isBrowser = typeof window !== "undefined";

const Game = () => {
  const [values, setValue] = useState(getGameStatus());
  const [selected, setSelected] = useState([0, 0]);
  const [invalidValues, setInvalidValues] = useState([]);

  const handleValueSelected = (value) => {
    setValue(() => {
      const nextValues = [...values];
      nextValues[selected[0]][selected[1]] = value;
      return nextValues;
    });
  };

  const handleRestart = () => {
    setValue(generateRandomGame());
  };

  useEffect(() => {
    setInvalidValues(getInvalidValues(values, selected));
    saveGameStatus(values);
  }, [selected, values]);
  return (
    <div className={styles.Game} style={{ "--board-size": SIZE }}>
      <Grid values={values} selected={selected} onSelect={setSelected} />
      <div className={styles.controls}>
        <Selector
          onSelect={handleValueSelected}
          invalidValues={invalidValues}
        />
        <div className={styles.restart} onClick={handleRestart}>
          Restart
        </div>
      </div>
    </div>
  );
};

export default memo(Game);

const getInvalidValues = (values, [column, row]) => {
  const initialColumn = column - (column % 3);
  const initialRow = row - (row % 3);
  const invalid = [];
  for (let i = 0; i <= values.length - 1; i++) {
    for (let j = 0; j <= values[0].length - 1; j++) {
      if (
        values[i][j] &&
        (i === column ||
          j === row ||
          (i >= initialColumn &&
            i <= initialColumn + 2 &&
            j >= initialRow &&
            j <= initialRow + 2)) &&
        invalid.indexOf(values[i][j]) === -1
      ) {
        values[i][j] && invalid.push(values[i][j]);
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

const generateRandomGame = () => {
  const matrix = Array.from({ length: SIZE }, (_, i) => [...Array(SIZE)]);
  for (let i = 0; i < INITIAL_NUMBERS_COUNT; i++) {
    let position;
    let isPositionInvalid = false;
    do {
      position = [getRandomInt(0, 8), getRandomInt(0, 8)];
      isPositionInvalid =
        typeof matrix[position[0]][position[1]] !== "undefined";
    } while (isPositionInvalid);
    let value;
    let isValueInvalid;
    do {
      value = getRandomInt();
      isValueInvalid = getInvalidValues(matrix, position).indexOf(value) !== -1;
    } while (isValueInvalid);
    matrix[position[0]][position[1]] = value;
  }
  return matrix;
};

const saveGameStatus = (gameStatus) => {
  isBrowser &&
    window.localStorage.setItem("game-status", JSON.stringify(gameStatus));
};

const getGameStatus = () => {
  const gameStatus = isBrowser && window.localStorage.getItem("game-status");
  return gameStatus ? JSON.parse(gameStatus) : generateRandomGame();
};
