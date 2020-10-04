import React, { memo, useState } from "react";
import classnames from "classnames";

import styles from "./Cell.module.css";

const Cell = ({ value, column, row, onSelect, isSelected }) => {
  const onClick = () => {
    onSelect([column, row]);
  };
  return (
    <div
      className={classnames(styles.Cell, { [styles.selected]: isSelected })}
      onClick={onClick}
    >
      {value}
    </div>
  );
};

export default memo(Cell);
