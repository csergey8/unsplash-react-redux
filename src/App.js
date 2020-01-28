import React from "react";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { NotFound } from "./components/404";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Photos } from './components/Photos';
import { Layout } from "./components/Layout";
import { OAuth } from './components/OAuth';


const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/photos/:text" exact component={Photos} />
          <Route path="/oauth" component={OAuth} exact />
          <Route component={NotFound} path={"*"} exact />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export { App };
