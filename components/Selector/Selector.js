import React, { memo } from "react";
import classnames from "classnames";

import styles from "./Selector.module.css";

const Selector = ({ onSelect, invalidValues }) => {
  return (
    <div className={styles.Selector}>
      <div className={styles.numbers}>
        {Array.from({ length: 9 }, (_, i) => i + 1).map((value) => (
          <div
            className={classnames(styles.number, {
              [styles.invalid]: invalidValues.indexOf(value) !== -1,
            })}
            onClick={() =>
              invalidValues.indexOf(value) === -1 && onSelect(value)
            }
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
