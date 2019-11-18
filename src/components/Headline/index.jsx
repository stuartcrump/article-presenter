import React, { useEffect, useState } from 'react';
import { Loading } from 'carbon-components-react';
import { Tile } from 'carbon-components-react';
import rxFetch from '../../services';
import { resourceUrl, asJSON, apiUrl, headlineContentType } from '../../constants';

function HeadlineComponent() {
  const [headline, setHeadline] = useState({
    headline: {
      document: {
        elements: {
          image: {
            value: {
              image: { url: '#' }
            }
          },
          text: 'text',
          title: 'test'
        }
      }
    }
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const queryURL = `${apiUrl}delivery/v1/search?q=*:*&fl=name,document,id,classification,type,status&fq=type:(${headlineContentType})&fq=classification:content${asJSON}`;

    const headline$ = rxFetch(queryURL).subscribe(
      data => {
        setHeadline(data);
        setFetched(true);
      },
      error => {
        setError(error.message);
        setFetched(true);
      }
    );

    return () => headline$.unsubscribe();
  }, []);

  function Headline() {
    console.log(headline);

    if (headline.errors) {
      return <h2>{headline.errors[0].message}</h2>;
    } else if (headline.numFound > 0) {
      const {
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
      } = headline;
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
    } else {
      return <h2>{'No Headline found'}</h2>;
    }
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
