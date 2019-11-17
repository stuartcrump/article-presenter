import React, { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import HeadlineComponent from '../../components/Headline/';
import CardComponent from '../../components/Card/';
import { Loading } from 'carbon-components-react';
import { tenantURL, baseURL, asJSON } from '../../constants';

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
    const deliveryURL = `${tenantURL}delivery/v1/search`;
    let queryURL;

    if (path.startsWith('/tag')) {
      queryURL = `${deliveryURL}?q=classification:content%20AND%20tags:"${id}"&fl=name&fl=classification&fl=tags${asJSON}`;
    } else {
      queryURL = `${deliveryURL}?q=*:*&fl=name,document,id,type&fq=classification:content&fq=categoryLeaves:"${id || 'Home'}"${asJSON}`;
    }

    const data$ = Observable.create(observer => {
      fetch(queryURL)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    }).subscribe(
      data => {
        setArticles(data);
        setFetched(true);
      },
      error => {
        setError(error.message);
        setFetched(true);
      }
    );

    return () => data$.unsubscribe();
  }, [id, path]);

  const Article = ({ document: { id, name, elements } }) => {
    return (
      <div className='bx--col-md-12 bx--col-lg-12'>
        <CardComponent
          id={id}
          title={name}
          text={`${elements.articleText.value.substring(0, 60)} ...`}
          thumbnail={`${baseURL}${elements.thumbnail.value.leadImage.url}`}
        />
      </div>
    );
  };

  const Articles = ({ articles: { documents, numFound } }) => {
    if (error) {
      return <h2>{error}</h2>;
    } else if (numFound > 0) {
      return documents.map(({ document }) => {
        return <Article document={document} key={document.id} />;
      });
    } else {
      return <h2>No articles found</h2>;
    }
  };

  return (
    <div className='category'>
      <HeadlineComponent />
      <div className='bx--grid bx--grid--full-width category-cards'>
        <div className='bx--row landing-page__r3'>{fetched ? <Articles articles={articles} /> : <Loading description='Loading' />}</div>
      </div>
    </div>
  );
}

export default Category;
