import React, { memo, useCallback, useEffect, useState } from "react";
import DifficultySelector from "../DifficultySelector/DifficultySelector";

import Grid from "../Grid/Grid";
import Selector from "../Selector/Selector";
import {
  generateRandomGame,
  getGameStatus,
  saveGameStatus,
  getInvalidValues,
} from "../util/game-util";

import styles from "./Game.module.css";

const Game = () => {
  const [values, setValue] = useState(getGameStatus().values);
  const [selected, setSelected] = useState([0, 0]);
  const [invalidValues, setInvalidValues] = useState([]);
  const [difficulty, setDifficulty] = useState(getGameStatus().difficulty);

  const handleValueSelected = (value) => {
    if (values[selected[0]][selected[1]].isFixed) {
      return;
    }
    values[selected[0]][selected[1]].number = value;
    setValue([...values]);
  };

  const handleDifficultyChange = (diff) => {
    setDifficulty(diff);
    saveGameStatus({ difficulty: diff });
  };

  const handleRestart = useCallback(() => {
    setValue(generateRandomGame(difficulty));
  }, [difficulty]);

  useEffect(() => {
    setInvalidValues(getInvalidValues(values, selected));
    saveGameStatus({ values });
  }, [selected, values]);
  return (
    <div className={styles.Game} style={{ "--board-size": values.length }}>
      <Grid values={values} selected={selected} onSelect={setSelected} />
      <div className={styles.controls}>
        <Selector
          onSelect={handleValueSelected}
          invalidValues={invalidValues}
        />
        <DifficultySelector
          value={difficulty}
          onChange={handleDifficultyChange}
        />
        <div className={styles.restart} onClick={handleRestart}>
          Restart
        </div>
      </div>
    </div>
  );
};

export default memo(Game);
