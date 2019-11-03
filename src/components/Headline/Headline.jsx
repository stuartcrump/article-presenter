import React from "react";
import { Tile } from "carbon-components-react";
import "./Headline.scss";

function Headline() {
  return (
    <div className="bx--col-lg-16">
      <Tile className="headline">
        <h3>Default Headline</h3>
        <p>
          Carbon provides styles and components in Vanilla, React, Angular, and Vue for anyone building on the web. Carbon provides styles
          and components in Vanilla, React, Angular...
        </p>
      </Tile>
    </div>
  );
}

export default Headline;
