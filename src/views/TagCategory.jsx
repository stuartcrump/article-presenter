import React, { useState, useEffect } from 'react';
import Headline from '../components/Headline/Headline';
import Card from '../components/Card/Card';
import './TagCategory.scss';
import { ContentSwitcher, Switch as CarbonSwitch } from 'carbon-components-react';
import _ from 'lodash';
import { tenantURL } from '../constants';
import axios from 'axios';

function TagCategory(props) {
  const [data, setData] = useState({
    numFound: 0,
    documents: []
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      console.log(props.match.params.id);
      const deliveryURL = `${tenantURL}delivery/v1/search`;
      const queryURL = `${deliveryURL}?q=classification:content%20AND%20tags:"${props.match.params.id}"&fl=name&fl=classification&fl=tags&fl=document:[json]`;

      axios
        .get(queryURL)
        .then(res => {
          setData(res.data);
          setFetched(true);
        })
        .catch(err => {
          setError(err.message);
          setFetched(true);
        });
    };
    fetchData();
  }, []);

  let articles;
  if (fetched) {
    if (error) {
      articles = <h1>{error}</h1>;
    } else if (!data.numFound) {
      articles = <h1>{'No article found'}</h1>;
    } else {
      articles = data.documents.map((article, index) => {
        const { document } = article;
        return (
          <div className='bx--col-md-12 bx--col-lg-12' key={index}>
            <Card
              id={document.id}
              title={document.name}
              text={`${document.elements.articleText.value.substr(0, 150) + '...'}`}
              tags={document.tags}
              thumbnail={`https://my12.digitalexperience.ibm.com/${document.elements.thumbnail.value.leadImage.url}`}
            />
          </div>
        );
      });
    }
  } else {
    articles = 'loading';
  }
  // console.log('render', props);
  return (
    <div>
      <ContentSwitcher
        onChange={function noRefCheck(e) {
          // setCategory(e.name);
        }}
        selectedIndex={0}
      >
        <CarbonSwitch name='Home' onClick={void 0} text='Home' key={'Home'} />
        <CarbonSwitch name='Category1' onClick={void 0} text='Category 1' key={'Cat1'} />
        <CarbonSwitch name='Category2' onClick={void 0} text='Category 2' key={'Cat2'} />
      </ContentSwitcher>
      <Headline />

      <div className='bx--grid bx--grid--full-width home-cards'>
        <div className='bx--row landing-page__r2'>
          <div className='bx--col bx--no-gutter'></div>
        </div>
        <div className='bx--row landing-page__r3'>{articles}</div>
      </div>
    </div>
  );
}

export default TagCategory;
