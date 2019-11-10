import React, { useState, useEffect } from 'react';
import Headline from '../components/Headline/Headline';
import Card from '../components/Card/Card';
import { Loading } from 'carbon-components-react';
import _ from 'lodash';
import { tenantURL } from '../constants';
import axios from 'axios';
import './Category.scss';

function Home(props) {
  const [data, setData] = useState({});
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const deliveryURL = `${tenantURL}delivery/v1/search`;
      const queryURL = `${deliveryURL}?q=*:*&fl=name,document,id,classification,type,status&fq=classification:content&fq=categoryLeaves:"${props.category}"&fl=document:[json]`;

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
  }, [props.category]);

  const renderArticles = () => {
    if (fetched) {
      console.log(data);
      if (error) {
        return <h2>{error}</h2>;
      } else if (data.numFound > 0) {
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
      } else {
        return <h2>{'No articles found'}</h2>;
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
        <div className='bx--row landing-page__r3'>{renderArticles()}</div>
      </div>
    </div>
  );
}

export default Home;
