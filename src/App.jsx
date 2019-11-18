import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/';
import Article from './views/Article/';
import Category from './views/Category/';

function App() {
  return (
    <Router basename={window.location.pathname}>
      <Header />
      <Switch>
        <Route exact path='/' render={props => <Category {...props} />}></Route>
        <Route exact path='/article/:id' render={() => <Article />}></Route>
        <Route exact path='/category/:id' render={props => <Category {...props} />}></Route>
        <Route exact path='/tag/:id' render={props => <Category {...props} />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
