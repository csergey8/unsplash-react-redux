import React from 'react';
import styles from './Buttons.module.scss';

const ButtonLoadMore = ({ loadMore }) => (
  <button
    className={`${styles.button} ${styles.buttonLoadMore}`}
    onClick={loadMore}
    type="button"
  >
    load more
  </button>
);

export { ButtonLoadMore };
