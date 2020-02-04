import React from "react";
import AddIcon from '@material-ui/icons/Add';
import styles from './Buttons.module.scss';

const ButtonCollect = ({ isAuth, className }) => {
  return (
    <button className={`${styles.button} ${styles.buttonCollect} ${className}`}>
      <AddIcon className={styles.icon} />
      <div className={styles.icon}>Collect</div>
    </button>
  );
};

export { ButtonCollect };
