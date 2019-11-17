import React from 'react';
import { Tag } from 'carbon-components-react';
import { Link } from 'react-router-dom';

function TagComponent({ title }) {
  return (
    <Link to={`/tag/${title}`}>
      <Tag className='tag' role='listitem' type='blue'>
        {title}
      </Tag>
    </Link>
  );
}

export default TagComponent;
