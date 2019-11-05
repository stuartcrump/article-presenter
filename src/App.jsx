import React from "react";
import Home from "./views/Home";
import Article from "./views/Article";
import TagCategory from "./views/TagCategory";
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
        <Route exact path="/tag/:id">
          <TagCategory />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
