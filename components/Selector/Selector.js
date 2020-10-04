import React, { memo } from "react";

import styles from "./Selector.module.css";

const Selector = () => {
  return (
    <div className={styles.Selector}>
      {[...Array(9)].map((_, index) => (
        <div className={styles.number}>{index + 1}</div>
      ))}
    </div>
  );
};

export default memo(Selector);
