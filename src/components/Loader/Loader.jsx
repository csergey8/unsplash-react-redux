import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './Loader.module.scss';


const Loader = () => (
  <div className={styles.Loader_container}>
    <CircularProgress />
  </div>
);

export { Loader };
