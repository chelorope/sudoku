import React, { memo, useState } from "react";

import Grid from "../Grid/Grid";
import Selector from "../Selector/Selector";

import styles from "./Game.module.css";

const SIZE = 9;

const matrix = Array.from({ length: 9 }, (_, i) => [...Array(9)]);

const Game = () => {
  const [values, setValue] = useState(matrix);
  const [selected, setSelected] = useState([0, 0]);

  const handleValueSelected = (value) => {
    console.log(value, selected, values);
    setValue((prevValues) => {
      const nextValues = [...values];
      nextValues[selected[0]][selected[1]] = value;
      return nextValues;
    });
  };
  return (
    <div className={styles.Game}>
      <Grid values={values} selected={selected} onSelect={setSelected} />
      <Selector onSelect={handleValueSelected} />
    </div>
  );
};

export default memo(Game);