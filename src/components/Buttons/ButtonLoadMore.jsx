import React from 'react';
import styles from "./Buttons.module.scss";

const ButtonLoadMore = (props) => {
    return (
        <button className={`${styles.button} ${styles.buttonLoadMore}`} onClick={props.loadMore}>load more</button>
    )
}

export { ButtonLoadMore }
