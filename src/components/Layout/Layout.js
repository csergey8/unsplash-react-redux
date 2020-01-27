import React from 'react';
import { Header } from '../Header';
//import styles from './Layout.module.scss';



const Layout = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

export { Layout };