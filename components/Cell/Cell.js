import React, { memo } from "react";

import styles from "./Cell.module.css";

const Cell = () => {
  return <div className={styles.Cell}></div>;
};

export default memo(Cell);
