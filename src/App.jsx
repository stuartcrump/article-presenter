import React, { useState, useEffect } from 'react';
import Home from './views/Home';
import Article from './views/Article';
import TagCategory from './views/TagCategory';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ContentSwitcher, Switch as CarbonSwitch } from 'carbon-components-react';
import { tenantURL, taxonomy } from './constants';
import './App.scss';
import axios from 'axios';

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

  return (
    <Router>
      <ContentSwitcher
        onChange={function noRefCheck(event) {
          // setCategory(event.name);
        }}
        selectedIndex={0}
      >
        {fetched
          ? categories.documents.map(category => {
              return <CarbonSwitch name={category.name} text={category.name} key={category.id} onClick={void 0} />;
            })
          : <CarbonSwitch name={'loading'} text={'loading'} key={'loading'} onClick={void 0} />}
      </ContentSwitcher>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/article/:id'>
          <Article />
        </Route>
        <Route exact path='/tag/:id' render={props => <TagCategory {...props} />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
