import React from 'react';
import { Tile } from 'carbon-components-react';
import { Link } from 'react-router-dom';
import './Card.scss';

function CardComponent({ id, thumbnail, text, title }) {
  return (
    <Link to={`/article/${id}`}>
      <Tile className='card'>
        <div className='bx--row'>
          <div className='bx--col-sm-1 bx--col-lg-1 card-image-col'>
            <div
              className='card-image'
              style={{
                background: `url(${thumbnail}) no-repeat center center / cover`
              }}
            ></div>
          </div>

          <div className='bx--col-sm-3 bx--col-lg-11'>
            <h4>{title}</h4>

            <div dangerouslySetInnerHTML={{ __html: text }} className='card-text'></div>
          </div>
        </div>
      </Tile>
    </Link>
  );
}

export default CardComponent;
