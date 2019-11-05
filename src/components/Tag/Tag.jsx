import React from "react";
import { Tag } from "carbon-components-react";
import { Link } from "react-router-dom";
import "./Tag.scss";

export default function TagComponent(props) {
  return (
    <Link to={`/tag/${props.title}`}>
      <Tag className="tag" role="listitem" type="blue">
        {props.title}
      </Tag>
    </Link>
  );
}
