import React, { useState, useEffect } from 'react';
import Headline from '../components/Headline/Headline';
import Card from '../components/Card/Card';
import { Loading, ContentSwitcher, Switch as CarbonSwitch } from 'carbon-components-react';
import _ from 'lodash';
import { tenantURL } from '../constants';
import axios from 'axios';
import './Home.scss';

function Home() {
  const [data, setData] = useState({});
  const [category, setCategory] = useState('Home');
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const deliveryURL = `${tenantURL}delivery/v1/search`;
      const queryURL = `${deliveryURL}?q=*:*&fl=name,document,id,classification,type,status&
        fq=classification:content&fq=categoryLeaves:"${category}"&fl=document:[json]`;

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
  }, [category]);

  let articles;

  if (fetched) {
    articles = error ? (
      <h2>{error}</h2>
    ) : (
      data.documents.map((article, index) => {
        const { document } = article;
        return (
          <div className='bx--col-md-12 bx--col-lg-12' key={index}>
            <Card
              id={document.id}
              title={document.name}
              text={`${_.truncate(document.elements.articleText.value, { length: 150 })}`}
              tags={document.tags}
              thumbnail={`https://my12.digitalexperience.ibm.com/${document.elements.thumbnail.value.leadImage.url}`}
            />
          </div>
        );
      })
    );
  } else {
    articles = <Loading description='Active loading indicator' small={false} withOverlay={false} />;
  }

  return (
    <div>
      <Headline />
      <div className='bx--grid bx--grid--full-width home-cards'>
        <div className='bx--row landing-page__r3'>{articles}</div>
      </div>
    </div>
  );
}

export default Home;
