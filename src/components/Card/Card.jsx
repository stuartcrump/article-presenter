import React from "react";
import { Tile } from "carbon-components-react";
import TagComponent from "../Tag/Tag.jsx";
import { Link } from "react-router-dom";

import "./Card.scss";

function Card(props) {
  return (
    <Tile className="card">
      <div className="bx--row">
        <div className="bx--col-sm-1 bx--col-lg-1">
          <img src={"https://my12.digitalexperience.ibm.com/" + props.thumbnail} alt="" width="90px" />
        </div>

        <div className="bx--col-sm-3 bx--col-lg-11">
          <Link to={`/article/${props.id}`}>
            <h3>{props.title}</h3>
          </Link>

          <p dangerouslySetInnerHTML={{ __html: props.text.substr(0, 60) + "..." }}></p>

          {props.tags.map((tag, index) => {
            if (index <= 1) {
              return <TagComponent title={tag} />;
            }
          })}
        </div>
      </div>
    </Tile>
  );
}

export default Card;
