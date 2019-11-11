import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from './views/Category';
import Article from './views/Article';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import { tenantURL, taxonomy } from './constants';
import './App.scss';

function App() {
  const [categories, setCategories] = useState({
    numFound: 0,
    documents: []
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesURL = `${tenantURL}/delivery/v1/search?q=*:*&fl=id,name&fq=classification:(category)&fq=path:(%5C/${taxonomy}/*)`;

      axios
        .get(categoriesURL)
        .then(res => {
          setCategories(res.data);
          setFetched(true);
        })
        .catch(err => {
          setError(err.message);
          setFetched(true);
        });
    };
    fetchCategories();
  }, []);

  function RenderHeader() {
    if (fetched) {
      return error ? <h2>Network Error</h2> : <Header categories={categories.documents} />;
    } else {
      return <Header categories={[]} />;
    }
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
