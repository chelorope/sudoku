import React, { memo, useEffect, useState } from "react";

import Grid from "../Grid/Grid";
import Selector from "../Selector/Selector";

import styles from "./Game.module.css";

const SIZE = 9;

const matrix = Array.from({ length: 9 }, (_, i) => [...Array(9)]);

const Game = () => {
  const [values, setValue] = useState(matrix);
  const [selected, setSelected] = useState([0, 0]);
  const [invalidValues, setInvalidValues] = useState([]);

  const handleValueSelected = (value) => {
    setValue(() => {
      const nextValues = [...values];
      nextValues[selected[0]][selected[1]] = value;
      return nextValues;
    });
  };

  useEffect(() => {
    setInvalidValues(getInvalidValues(values, selected));
  }, [selected, values]);
  return (
    <div className={styles.Game}>
      <Grid values={values} selected={selected} onSelect={setSelected} />
      <Selector onSelect={handleValueSelected} invalidValues={invalidValues} />
    </div>
  );
};

const getInvalidValues = (values, [column, row]) => {
  const initialColumn = column - (column % 3);
  const initialRow = row - (row % 3);
  const invalid = [];
  for (let i = 0; i <= values.length - 1; i++) {
    for (let j = 0; j <= values[0].length - 1; j++) {
      if (
        i === column ||
        j === row ||
        (i >= initialColumn &&
          i <= initialColumn + 2 &&
          j >= initialRow &&
          j <= initialRow + 2)
      ) {
        values[i][j] && invalid.push(values[i][j]);
      }
    }
  }
  return invalid;
};

export default memo(Game);
