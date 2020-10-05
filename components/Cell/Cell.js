import React, { memo, useState } from "react";
import classnames from "classnames";

import styles from "./Cell.module.css";

const Cell = ({ value, column, row, onSelect, isSelected }) => {
  const onClick = () => {
    onSelect([column, row]);
  };
  return (
    <div
      className={classnames(styles.Cell, {
        [styles.selected]: isSelected,
        [styles.fixed]: value.isFixed,
      })}
      onClick={onClick}
    >
      {value.number}
    </div>
  );
};

export default memo(
  Cell,
  (prevProps, nextProps) => prevProps.number !== nextProps.number
);
