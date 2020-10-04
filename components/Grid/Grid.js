import React, { memo, useState } from "react";

import Cell from "../Cell/Cell";

import styles from "./Grid.module.css";

const Grid = ({ values, onSelect, selected }) => {
  return (
    <div className={styles.Grid}>
      {values.map((column, columnIndex) => (
        <div className={styles.column} key={columnIndex}>
          {column.map((item, rowIndex) => (
            <Cell
              column={columnIndex}
              row={rowIndex}
              key={rowIndex}
              value={item}
              isSelected={
                columnIndex === selected[0] && rowIndex === selected[1]
              }
              onSelect={onSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(Grid);
