import React, { useState, useEffect } from 'react';
import HeadlineComponent from '../../components/Headline/';
import CardComponent from '../../components/Card/';
import { Loading } from 'carbon-components-react';
import { tenantURL, baseURL, asJSON } from '../../constants';
import './style.scss';

function Category({
  match: {
    params: { id },
    path
  }
}) {
  const [articles, setArticles] = useState({
    documents: [],
    numFound: 0
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const deliveryURL = `${tenantURL}delivery/v1/search`;
      let queryURL;

      if (path.startsWith('/tag')) {
        queryURL = `${deliveryURL}?q=classification:content%20AND%20tags:"${id}"&fl=name&fl=classification&fl=tags${asJSON}`;
      } else {
        queryURL = `${deliveryURL}?q=*:*&fl=name,document,id,type&fq=classification:content&fq=categoryLeaves:"${id || 'Home'}"${asJSON}`;
      }

      const result = await fetch(queryURL);

      result
        .json()
        .then(res => {
          setArticles(res);
          setFetched(true);
        })
        .catch(err => {
          setError(err.message);
          setFetched(true);
        });
    })();
  }, [id, path]);

  const renderArticles = () => {
    const { documents, numFound } = articles;

    if (error) {
      return <h2>{error}</h2>;
    } else if (numFound > 0) {
      return documents.map(({ document }) => {
        const { id, name, elements } = document;

        return (
          <div className='bx--col-md-12 bx--col-lg-12' key={id}>
            <CardComponent
              id={id}
              title={name}
              text={`${elements.articleText.value.substring(0, 55)}...`}
              thumbnail={`${baseURL}${elements.thumbnail.value.leadImage.url}`}
            />
          </div>
        );
      });
    } else {
      return <h2>No articles found</h2>;
    }
  };

  return (
    <div className='category'>
      <HeadlineComponent />
      <div className='bx--grid bx--grid--full-width category-cards'>
        <div className='bx--row landing-page__r3'>
          {fetched ? renderArticles() : <Loading description='Loading' small={false} withOverlay={false} />}
        </div>
      </div>
    </div>
  );
}

export default Category;
