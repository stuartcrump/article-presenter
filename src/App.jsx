import React, { useState, useEffect } from 'react';
import Category from './views/Category';
import Article from './views/Article';
import TagCategory from './views/TagCategory';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ContentSwitcher,
  Switch as CarbonSwitch
} from 'carbon-components-react';
import { tenantURL, taxonomy } from './constants';
import './App.scss';
import axios from 'axios';
import { Loading } from 'carbon-components-react';

function App() {
  const [categories, setCategories] = useState({
    numFound: 0,
    documents: []
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('Home');

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

  const renderCategories = () => {
    if (fetched) {
      return error
        ? 'Error'
        : categories.documents.map(category => {
            return (
              <CarbonSwitch
                name={category.name}
                text={category.name}
                key={category.id}
                onClick={void 0}
              />
            );
          });
    } else {
      return <Loading description='Loading' small={true} withOverlay={false} />;
    }
  };

  return (
    <Router>
      <ContentSwitcher
        onChange={function noRefCheck(event) {
          setCategory(event.name);
          console.log(event.name)
        }}
        selectedIndex={0}
      >
        {renderCategories()}
      </ContentSwitcher>

      <Switch>
        <Route exact path='/'>
        <Category category={category} />
        </Route>
        <Route path='/article/:id'>
          <Article />
        </Route>
        <Route
          exact
          path='/category/:id'
          render={props => <Category category={category} />}
        ></Route>
        <Route
          exact
          path='/tag/:id'
          render={props => <TagCategory {...props} />}
        ></Route>
      </Switch>
    </Router>
  );
}

export default App;
