import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Article from './views/Article';
import Category from './views/Category';
import Thankyou from './views/Thankyou';
import { appPath } from './utils/constants';
import './App.scss';

function App() {
  return (
    <Router basename={appPath}>
      <Header />
      <Switch>
        <Route exact path='/' render={props => <Category {...props} />}></Route>
        <Route exact path='/article/:id' render={() => <Article />}></Route>
        <Route exact path='/category/:id' render={props => <Category {...props} />}></Route>
        <Route exact path='/tag/:id' render={props => <Category {...props} />}></Route>
        <Route exact path='/thankyou' render={() => <Thankyou />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
