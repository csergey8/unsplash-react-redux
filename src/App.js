import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { initToken } from './redux/auth';
import { Home } from "./components/Home";
import { NotFound } from "./components/404";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Photos } from './components/Photos';
import { Layout } from "./components/Layout";
import { OAuth } from './components/OAuth';


const App = (props) => {
  useEffect(() => {
    if(!props.isAuth){
      props.initToken()
    }
  })
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/s/photos/:text" component={Photos} />
          <Route path="/oauth" component={OAuth} exact />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const mapDispatchToProps = dispatch => ({
  initToken: () => dispatch(initToken())
})

const mapStateToProps = (state) => ({
  isAuth: state.authReducer.isAuth
})

const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(App)


export { AppWithRedux as App };
