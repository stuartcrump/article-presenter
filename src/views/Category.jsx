import React, { useState, useEffect } from 'react';
import Headline from '../components/Headline/Headline';
import Card from '../components/Card/Card';
import { Loading } from 'carbon-components-react';
import _ from 'lodash';
import { tenantURL, baseURL } from '../constants';
import axios from 'axios';
import './Category.scss';

function Category(props) {
  const [data, setData] = useState({
    documents: [],
    numFound: 0
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let queryURL;
      const deliveryURL = `${tenantURL}delivery/v1/search`;

      if (props.match.path.startsWith('/tag')) {
        queryURL = `${deliveryURL}?q=classification:content%20AND%20tags:"${props.match.params.id}"&fl=name&fl=classification&fl=tags&fl=document:[json]`;
      } else {
        queryURL = `${deliveryURL}?q=*:*&fl=name,document,id,classification,type,status&fq=classification:content&fq=categoryLeaves:"${props
          .match.params.id || 'Home'}"&fl=document:[json]`;
      }

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
  }, [props]);

  const renderArticles = () => {
    if (fetched) {
      if (error) {
        return <h2>{error}</h2>;
      } else if (data.numFound > 0) {
        return _.map(data.documents, (article, index) => {
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
                thumbnail={`${baseURL}${document.elements.thumbnail.value.leadImage.url}`}
              />
            </div>
          );
        });
      } else {
        return <h2>No articles found</h2>;
      }
    } else {
      return <Loading description='Loading' small={false} withOverlay={false} />;
    }
  };

  return (
    <div className='category'>
      <Headline />
      <div className='bx--grid bx--grid--full-width category-cards'>
        <div className='bx--row landing-page__r3'>{renderArticles()}</div>
      </div>
    </div>
  );
}

export default Category;
