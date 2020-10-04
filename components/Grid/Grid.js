import React, { memo } from "react";

import Cell from "../Cell/Cell";

import styles from "./Grid.module.css";

const SIZE = 9;

const Grid = () => {
  return (
    <div className={styles.Grid}>
      {[...Array(SIZE).keys()].map((_, column) =>
        [...Array(SIZE).keys()].map((_, row) => (
          <Cell column={column} row={row} key={`${column}-${row}`} />
        ))
      )}
    </div>
  );
};

export default memo(Grid);
