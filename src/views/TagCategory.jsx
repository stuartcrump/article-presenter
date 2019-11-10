import React, { useState, useEffect } from 'react';
import Headline from '../components/Headline/Headline';
import Card from '../components/Card/Card';
import './TagCategory.scss';
import _ from 'lodash';
import { tenantURL } from '../constants';
import axios from 'axios';
import {
  Loading
} from 'carbon-components-react';
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

  const renderArticles = () => {
    if (fetched) {
      if (error) {
        return <h1>{error}</h1>;
      } else if (!data.numFound) {
        return <h1>{'No article found with the given tag'}</h1>;
      } else {
        return data.documents.map((article, index) => {
          const { document } = article;
          return (
            <div className='bx--col-md-12 bx--col-lg-12' key={index}>
              <Card
                id={document.id}
                title={document.name}
                text={`${_.truncate(document.elements.articleText.value, {
                  length: 85
                })}`}
                tags={document.tags}
                thumbnail={`https://my12.digitalexperience.ibm.com/${document.elements.thumbnail.value.leadImage.url}`}
              />
            </div>
          );
        });
      }
    } else {
      return (
        <Loading description='Loading' small={false} withOverlay={false} />
      );
    }
  };

  return (
    <div>
      <Headline />

      <div className='bx--grid bx--grid--full-width home-cards'>
        <div className='bx--row landing-page__r2'>
          <div className='bx--col bx--no-gutter'></div>
        </div>
        <div className='bx--row landing-page__r3'>{renderArticles()}</div>
      </div>
    </div>
  );
}

export default TagCategory;
