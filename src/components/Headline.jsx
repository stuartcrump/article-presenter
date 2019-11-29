import React, { useEffect, useState } from 'react';
import { Loading } from 'carbon-components-react';
import rxFetch from '../utils/helpers';
import { asJSON, apiUrl, headlineContentType } from '../utils/constants';
import PersonalizedHeadline from './PersonalizedHeadline';
import './Headline.scss';

function HeadlineComponent() {
  const [fetched, setFetched] = useState(false);
  const [headlines, setHeadlines] = useState({
    documents: [],
    numFound: 0,
    error: false,
    message: 'Error'
  });

  useEffect(() => {
    const queryURL = `${apiUrl}delivery/v1/search?q=*:*&fl=name,document,id,classification,type&fq=type:(${headlineContentType})&fq=classification:content AND tags:"Default"${asJSON}`;

    const headline$ = rxFetch(queryURL).subscribe({
      next: response => setHeadlines(response),
      complete: () => setFetched(true)
    });

    return () => headline$.unsubscribe();
  }, []);

  if (fetched) {
    const { documents, numFound, error, message } = headlines;

    if (error) {
      return <h2>{message}, couldn't get headline</h2>;
    } else if (numFound === 0) {
      return <h2>Headline not found</h2>;
    } else {
      const { elements } = documents && documents[0] && documents[0].document;
      return (
        <div className='bx--col-lg-16'>
          <PersonalizedHeadline headline={elements} />
        </div>
      );
    }
  } else {
    return <Loading description='Loading' withOverlay={false} />;
  }
}

export default HeadlineComponent;
