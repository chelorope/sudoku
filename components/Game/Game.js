import React, { memo, useEffect, useState } from "react";

import Grid from "../Grid/Grid";
import Selector from "../Selector/Selector";

import styles from "./Game.module.css";

const SIZE = 9;

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
    setValue(getEmptyMatrix());
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

const getEmptyMatrix = () =>
  Array.from({ length: SIZE }, (_, i) => [...Array(SIZE)]);

const saveGameStatus = (gameStatus) => {
  isBrowser &&
    window.localStorage.setItem("game-status", JSON.stringify(gameStatus));
};

const getGameStatus = () => {
  const gameStatus = isBrowser && window.localStorage.getItem("game-status");
  return gameStatus ? JSON.parse(gameStatus) : getEmptyMatrix();
};
