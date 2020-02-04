import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Buttons.module.scss";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const ButtonDownload = ({ link, history }) => {
  const onClickHandler = e => {
    e.stopPropagation()
    //window.location.assign(link)
  };
  return (
    <div onClick={onClickHandler}>
      <a
        href={link}
        download
        target="_blank"
        className={`${styles.button} ${styles.buttonDownload}`}
      >
        <ArrowDownwardIcon className={styles.icon} />
      </a>
    </div>
  );
};

const ButtonDownloadWithRouter = withRouter(ButtonDownload);

export { ButtonDownloadWithRouter as ButtonDownload };
