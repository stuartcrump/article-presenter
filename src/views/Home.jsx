import React, { useState, useEffect } from "react";
import Headline from "../components/Headline/Headline";
import Card from "../components/Card/Card";
import "./Home.scss";
import { getCategoryItems } from "../services/articles";
import { ContentSwitcher, Switch as CarbonSwitch } from "carbon-components-react";

function Home() {
  const [data, setData] = useState({ documents: [] });
  const [category, setCategory] = useState("Home");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCategoryItems(category);
      const { data } = result;

      setData(data);
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
        <CarbonSwitch name="Home" onClick={void 0} text="Home" />
        <CarbonSwitch name="Category1" onClick={void 0} text="Category 1" />
        <CarbonSwitch name="Category2" onClick={void 0} text="Category 2" />
      </ContentSwitcher>
      <Headline />

      <div className="bx--grid bx--grid--full-width home-cards">
        <div className="bx--row landing-page__r2">
          <div className="bx--col bx--no-gutter"></div>
        </div>
        <div className="bx--row landing-page__r3">
          {data &&
            data.documents &&
            data.documents.map(article => {
              const details = JSON.parse(article.document);
              return (
                <div className="bx--col-md-12 bx--col-lg-12">
                  <Card
                    id={details.id}
                    title={details.name}
                    text={details.elements.articleText.value}
                    tags={details.tags}
                    thumbnail={details.elements.thumbnail.value.leadImage.url}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
