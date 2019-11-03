import React from "react";
import { Tag } from "carbon-components-react";
import './Tag.scss';

export default function TagComponent(props) {
  return (
    <Tag className="tag" role="listitem" type="warm-gray">
      {props.title}
    </Tag>
  );
}
