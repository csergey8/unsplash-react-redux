import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './Buttons.module.scss';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const ButtonDownload = ({ link, history }) => {
    const downloadHandler = (e) => {
        //e.preventDefault();
        //window.location.assign(link)
    }
    return (
        <Link to={link} download target="_self" className={`${styles.button} ${styles.buttonDownload}`}>
            <ArrowDownwardIcon className={styles.icon} />
        </Link>
    )
}

const ButtonDownloadWithRouter = withRouter(ButtonDownload)

export { ButtonDownloadWithRouter as ButtonDownload }
