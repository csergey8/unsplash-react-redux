import React from 'react';
import { withRouter } from 'react-router';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import styles from './Buttons.module.scss';

const ButtonDownload = ({ link }) => (
  <div>
    <a
      href={link}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.button} ${styles.buttonDownload}`}
    >
      <ArrowDownwardIcon className={styles.icon} />
    </a>
  </div>
);


const ButtonDownloadWithRouter = withRouter(ButtonDownload);

export { ButtonDownloadWithRouter as ButtonDownload };
