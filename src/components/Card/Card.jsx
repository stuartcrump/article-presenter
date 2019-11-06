import React from 'react';
import { Tile } from 'carbon-components-react';
import TagComponent from '../Tag/Tag.jsx';
import { Link } from 'react-router-dom';

import './Card.scss';

function Card(props) {
  return (
    <Link to={`/article/${props.id}`}>
      <Tile className='card'>
        <div className='bx--row'>
          <div className='bx--col-sm-1 bx--col-lg-1 card-image-col'>
            <div
              className='card-image'
              style={{
                background: `url(${props.thumbnail}) no-repeat center center / cover`
              }}
            ></div>
          </div>

          <div className='bx--col-sm-3 bx--col-lg-11'>
            <h4>{props.title}</h4>

            <p dangerouslySetInnerHTML={{ __html: props.text }} className='card-text'></p>
          </div>
        </div>
      </Tile>
    </Link>
  );
}

export default Card;
