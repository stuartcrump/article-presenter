import React from 'react';
import { Tile } from 'carbon-components-react';
import { secondlineBackground } from '../../constants';
import './style.scss';

function Headline2Component() {
  return (
    <div
      className='bx--col-lg-16'
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${secondlineBackground}) no-repeat center center`,
        backgroundSize: 'cover'
      }}
    >
      <Tile className='headline2'>
        <h3>Default Headline</h3>
        <p>
          Carbon provides styles and components in Vanilla, React, Angular, and Vue for anyone building on the web. Carbon provides styles
          and components in Vanilla, React, Angular...
        </p>
      </Tile>
    </div>
  );
}

export default Headline2Component;
