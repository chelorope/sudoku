import React, { memo } from "react";

import styles from "./Selector.module.css";

const Selector = ({ onSelect }) => {
  return (
    <div className={styles.Selector}>
      <div className={styles.numbers}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
          <div
            className={styles.number}
            onClick={() => onSelect(value)}
            key={value}
          >
            {value}
          </div>
        ))}
      </div>
      <div className={styles.delete} onClick={() => onSelect(undefined)}>
        Borrar
      </div>
    </div>
  );
};

export default memo(Selector);
