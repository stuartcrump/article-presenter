import React from "react";
import Home from "./views/Home";
import Article from "./views/Article";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/article/:id">
          <Article />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
