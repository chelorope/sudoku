import React, { memo, useState } from "react";

import styles from "./DifficultySelector.module.css";

const DifficultySelector = ({ onChange, value }) => {
  return (
    <label className={styles.DifficultySelector}>
      Dificultad:
      <select
        name="difficulty"
        className={styles.select}
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="evil">Evil</option>
        <option value="hard">Hard</option>
        <option value="medium">Medium</option>
        <option value="easy">Easy</option>
      </select>
    </label>
  );
};

export default memo(DifficultySelector);
