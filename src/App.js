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
          <Route path="/s/photos/:text" component={Photos} />
          <Route path="/oauth" component={OAuth} exact />
          <Route path="/" exact component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export { App };
