import React, { memo, useState } from "react";

import Cell from "../Cell/Cell";

import styles from "./Grid.module.css";

const SIZE = 9;

const matrix = Array.from({ length: 9 }, (_, i) => [...Array(9)]);

const Grid = () => {
  const [values, setValue] = useState(matrix);
  const [selected, setSelected] = useState([0, 0]);
  return (
    <div className={styles.Grid}>
      {matrix.map((column, columnIndex) => (
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
              onSelect={setSelected}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(Grid);
