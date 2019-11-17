import React from 'react';
import { Tile } from 'carbon-components-react';
import { headlineBackground } from '../../constants';

function HeadlineComponent() {
  return (
    <div className='bx--col-lg-16'>
      <Tile
        className='headline'
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${headlineBackground}) no-repeat center center`,
          backgroundSize: 'cover'
        }}
      >
        <h3>Default Headline</h3>
        <p>
          Carbon provides styles and components in Vanilla, React, Angular, and Vue for anyone building on the web. Carbon provides styles
          and components in Vanilla, React, Angular...
        </p>
      </Tile>
    </div>
  );
}

export default HeadlineComponent;
