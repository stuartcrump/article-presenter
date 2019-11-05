import React, { useState, useEffect } from "react";
import Headline from "../components/Headline/Headline";
import Card from "../components/Card/Card";
import "./TagCategory.scss";
import { getCategoryItems } from "../services/articles";
import { ContentSwitcher, Switch as CarbonSwitch } from "carbon-components-react";

function TagCategory() {
  const [data, setData] = useState({ documents: [] });
  const [category, setCategory] = useState("Home");
  const [loading, setLoadingState] = useState({ loading: false });

  useEffect(() => {
    const tag = unescape(window.location.pathname.replace("/tag/", ""));

    const fetchData = async () => {
      setLoadingState(true);

      const result = await getCategoryItems(tag, true);
      const { data } = result;

      console.log(data);
      setData(data);
      setLoadingState(false);
    };
    fetchData();
  }, [category]);

  return (
    <div>
      <ContentSwitcher
        onChange={function noRefCheck(e) {
          setCategory(e.name);
        }}
        selectedIndex={0}
      >
        <CarbonSwitch name="Home" onClick={void 0} text="Home" key={"Home"} />
        <CarbonSwitch name="Category1" onClick={void 0} text="Category 1" key={"Cat1"} />
        <CarbonSwitch name="Category2" onClick={void 0} text="Category 2" key={"Cat2"} />
      </ContentSwitcher>
      <Headline />

      <div className="bx--grid bx--grid--full-width home-cards">
        <div className="bx--row landing-page__r2">
          <div className="bx--col bx--no-gutter"></div>
        </div>
        <div className="bx--row landing-page__r3">
          {loading ? (
            <p>Loading..</p>
          ) : (
            data.documents &&
            data.documents.map((article, index) => {


              const details = article.document;
              return (
                <div className="bx--col-md-12 bx--col-lg-12" key={index}>
                  <Card
                    id={details.id}
                    title={details.name}
                    text={`${details.elements.articleText.value.substr(0, 50) + "..."}`}
                    tags={details.tags}
                    thumbnail={`https://my12.digitalexperience.ibm.com/${details.elements.thumbnail.value.leadImage.url}`}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default TagCategory;
