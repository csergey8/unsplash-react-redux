import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { initToken } from './redux/auth';
import { Home } from "./components/Home";
import { NotFound } from "./components/404";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Photos } from './components/Photos';
import { Layout } from "./components/Layout";
import { OAuth } from './components/OAuth';
import { Profile } from './components/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';

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
          <ProtectedRoute path="/profile" component={Profile} exact />
          <Route path="/p" component={Home} />
          <Route path="/" exact>
            <Redirect to="/p"/>
          </Route>
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
