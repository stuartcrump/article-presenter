import React, { useEffect, useState } from 'react';
import { Loading } from 'carbon-components-react';
import { Tile } from 'carbon-components-react';
import rxFetch from '../../services';
import { resourceUrl, asJSON, apiUrl, headlineContentType } from '../../constants';

function HeadlineComponent() {
  const [headline, setHeadline] = useState({
    name: '',
    title: '',
    text: ''
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const queryURL = `${apiUrl}delivery/v1/search?q=*:*&fl=name,document,id,classification,type,status&fq=type:(${headlineContentType})&fq=classification:content${asJSON}`;

    const headline$ = rxFetch(queryURL).subscribe(
      data => {
        setHeadline(data.documents[0]); // index handles which one to be shown
        setFetched(true);
      },
      error => {
        setError(error);
        setFetched(true);
      }
    );

    return () => headline$.unsubscribe();
  }, []);

  function Headline({
    headline: {
      document: {
        elements: {
          image: {
            value: {
              image: { url }
            }
          },
          text,
          title
        }
      }
    }
  }) {
    return (
      <Tile
        className='headline'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${resourceUrl}${url}) no-repeat center center`,
          backgroundSize: 'cover'
        }}
      >
        <h3>{title.value}</h3>
        <p dangerouslySetInnerHTML={{ __html: text.value }}></p>
      </Tile>
    );
  }

  if (fetched) {
    return error ? (
      <h2>error</h2>
    ) : (
      <div className='bx--col-lg-16'>
        <Headline headline={headline} />
      </div>
    );
  } else {
    return <Loading description='Loading' withOverlay={false} />;
  }
}

export default HeadlineComponent;
