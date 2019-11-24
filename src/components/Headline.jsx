import React, { useEffect, useState } from 'react';
import { Loading } from 'carbon-components-react';
import { Tile } from 'carbon-components-react';
import rxFetch from '../utils/helpers';
import { resourceUrl, asJSON, apiUrl, headlineContentType } from '../utils/constants';
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
    const queryURL = `${apiUrl}delivery/v1/search?q=*:*&fl=name,document,id,classification,type&fq=type:(${headlineContentType})&fq=classification:content${asJSON}`;

    const headline$ = rxFetch(queryURL).subscribe({
      next: response => setHeadlines(response),
      complete: () => setFetched(true)
    });

    return () => headline$.unsubscribe();
  }, []);

  function Headline({ headline }) {
    const image = headline && headline.image && headline.image.value && headline.image.value.image && headline.image.value.image.url;
    const title = headline && headline.title && headline.title.value;
    const text = headline && headline.text && headline.text.value;

    return (
      <Tile
        className='headline'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${resourceUrl}${image}) no-repeat center center`,
          backgroundSize: 'cover'
        }}
      >
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </Tile>
    );
  }

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
          <Headline headline={elements} />
        </div>
      );
    }
  } else {
    return <Loading description='Loading' withOverlay={false} />;
  }
}

export default HeadlineComponent;
