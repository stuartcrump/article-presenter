import React, { useEffect, useState } from "react";
import { Tile, Form, FormGroup, TextInput, Button, Toggle } from "carbon-components-react";
import Tag from "../components/Tag/Tag";
import "./Article.scss";
import { getArticle } from "../services/article";

function Article() {
  const articleId = window.location.pathname.replace("/article/", "");
  const [article, setData] = useState({ article: {} });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArticle(articleId);
      const { data } = result;
      console.log(data.elements);
      setData(data);
    };
    fetchData();
  }, {});

  return (
    <div className="bx--grid bx--grid--full-width">
      <Tile className="article">
        <div className="bx--row article-image" style={{ background: "url(http://placehold.jp/465x200.png)" }}></div>

        <div className="bx--row article-heading">
          <div className="bx--col-sm-3 bx--col-lg-3">
            <h2>{article.name}</h2>
          </div>
        </div>

        <div className="bx--row article-text">
          <div className="bx--col-sm-12 bx--col-lg-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, voluptatum alias labore esse magni cumque id amet sapiente
            possimus, deleniti enim. Ad explicabo corrupti asperiores voluptas ratione, architecto aliquam beatae?
            {/* <p dangerouslySetInnerHTML={{ __html: article.elements.articleText.value }}></p> */}
          </div>
        </div>
        <div className="bx--row article-form">
          <Form className="article-form-element" onSubmit={function noRefCheck() {}}>
            <FormGroup className="form-group" invalid={false} legendText="" message={false} messageText="">
              <div className="bx--row form-input-row">
                <TextInput
                  className="name-input"
                  disabled={false}
                  id="article-form-name"
                  invalid={false}
                  invalidText=""
                  labelText="Name"
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  placeholder="Input your full name"
                  type="text"
                />
              </div>

              <div className="bx--row form-input-row">
                <TextInput
                  className="email-input"
                  disabled={false}
                  id="test2"
                  invalid={false}
                  invalidText=""
                  labelText="Email"
                  onChange={function noRefCheck() {}}
                  onClick={function noRefCheck() {}}
                  placeholder="Input your email address"
                  type="email"
                />
              </div>

              <div className="bx--row form-input-row">
                <div className="bx--col-sm-2 consent-toggle-wrapper">
                  <Toggle
                    aria-label="Toggle"
                    className="some-class"
                    defaultToggled={true}
                    id="consent-toggle"
                    labelA="I don't consent"
                    labelB="I consent"
                    onToggle={function noRefCheck() {}}
                  />
                </div>
                <div className="bx--col-sm-2 signup-button-wrapper">
                  <Button className="signup-button" kind="primary" tabIndex={0} type="submit">
                    SIGN ME UP
                  </Button>
                </div>
              </div>
            </FormGroup>
          </Form>
        </div>

        <div className="bx--row article-tags">
          <Tag />
          <Tag />
          <Tag />
        </div>
      </Tile>
    </div>
  );
}

export default Article;
