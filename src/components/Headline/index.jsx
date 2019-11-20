import React, { useEffect, useState } from 'react';
import { Loading } from 'carbon-components-react';
import { Tile } from 'carbon-components-react';
import rxFetch from '../../services';
import { resourceUrl, asJSON, apiUrl, headlineContentType } from '../../constants';

function HeadlineComponent() {
  const [headlines, setHeadlines] = useState({});
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const queryURL = `${apiUrl}delivery/v1/search?q=*:*&fl=name,document,id,classification,type&fq=type:(${headlineContentType})&fq=classification:content${asJSON}`;

    const headline$ = rxFetch(queryURL).subscribe(
      data => {
        setHeadlines(data);
        setFetched(true);
      },
      error => {
        setError(error.message);
        setFetched(true);
      }
    );

    return () => headline$.unsubscribe();
  }, []);

  function Headline({ headline }) {
    return (
      <Tile
        className='headline'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${resourceUrl}${headline.image.value.image.url}) no-repeat center center`,
          backgroundSize: 'cover'
        }}
      >
        <h3>{headline.title.value}</h3>
        <p dangerouslySetInnerHTML={{ __html: headline.text.value }}></p>
      </Tile>
    );
  }

  if (fetched) {
    if (error) {
      return <h2>{error}</h2>;
    } else if (headlines.numFound === 0) {
      return <h2>{'No Headline found'}</h2>;
    } else {
      const headline = headlines.documents[0].document.elements;
      return (
        <div className='bx--col-lg-16'>
          <Headline headline={headline} />
        </div>
      );
    }
  } else {
    return <Loading description='Loading' withOverlay={false} />;
  }
}

export default HeadlineComponent;
