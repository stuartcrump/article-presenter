import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Article from './views/Article';
import Category from './views/Category';
import Thankyou from './views/Thankyou';
import { appPath } from './utils/constants';
import './App.scss';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

class App extends Component {
  pageView() {
    const history = createBrowserHistory();
    const location = history.location;
    let title = location.pathname.split('/')[4];

    ReactGA && ReactGA.set({ page: location.pathname });
    console.log('location pathname', location);
    console.log('title ', title);

    window.gaEvents && window.gaEvents && window.gaEvents.ibmpageView && window.gaEvents.ibmpageView(location.pathname, title);
  }

  render() {
    return (
      <Router basename={appPath} history={this.history}>
        <Header />
        <Switch>
          <Route exact path='/' render={props => <Category {...props} />}></Route>
          <Route exact path='/article/:id' render={() => <Article />}></Route>
          <Route exact path='/category/:id' render={props => <Category onChange={this.pageView()} {...props} />}></Route>
          <Route exact path='/tag/:id' render={props => <Category {...props} />}></Route>
          <Route exact path='/thankyou' render={() => <Thankyou />}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;