import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { tenantURL, taxonomy } from './constants';
import Header from './components/Header/';
import Article from './views/Article/';
import Category from './views/Category/';
import './App.scss';

/**
 * App Component
 * Root of the react app
 */
function App() {
  const [error, setError] = useState('');
  const [categories, setCategories] = useState({
    numFound: 0,
    documents: []
  });

  useEffect(() => {
    (async () => {
      const categoriesURL = `${tenantURL}/delivery/v1/search?q=*:*&fl=id,name&fq=classification:(category)&fq=path:(%5C/${taxonomy}/*)`;
      const result = await fetch(categoriesURL);

      result
        .json()
        .then(result => setCategories(result))
        .catch(error => setError(error.message));
    })();
  }, []);

  function RenderHeader() {
    return error ? <h2>Network Error</h2> : <Header categories={categories.documents} />;
  }

  return (
    <Router>
      <RenderHeader />
      <Switch>
        <Route exact path='/' render={props => <Category {...props} />}></Route>
        <Route path='/article/:id' render={() => <Article />}></Route>
        <Route exact path='/category/:id' render={props => <Category {...props} />}></Route>
        <Route exact path='/tag/:id' render={props => <Category {...props} />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
