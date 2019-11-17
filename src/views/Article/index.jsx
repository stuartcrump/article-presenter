import React, { useEffect, useState } from 'react';
import { Tile, Loading } from 'carbon-components-react';
import { tenantURL, baseURL } from '../../constants';
import TagComponent from '../../components/Tag/';
import FormComponent from '../../components/Form/';
import { Observable } from 'rxjs';

function Article() {
  const [article, setArticle] = useState({
    name: 'Default Name',
    elements: {
      articleImage: { value: { image: { url: '' } } },
      articleText: { value: 'Default Text' }
    },
    tags: []
  });
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const articleId = window.location.pathname.replace('/article/', '');
    const deliveryURL = `${tenantURL}delivery/v1/content/${articleId}&fl=document:[json]`;
    const data$ = Observable.create(observer => {
      fetch(deliveryURL)
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    }).subscribe(
      data => {
        setArticle(data);
        setFetched(true);
      },
      error => {
        setError(error.message);
        setFetched(true);
      }
    );

    return () => data$.unsubscribe();
  }, [fetched]);

  if (fetched) {
    const { name, elements, tags } = article;

    return error ? (
      <h2>{error}</h2>
    ) : (
      <div className='bx--grid bx--grid--full-width'>
        <Tile className='article'>
          <div
            className='bx--row article-image'
            style={{
              background: `url(${baseURL}${elements.articleImage.value.image.url}) no-repeat center center`,
              backgroundSize: 'cover'
            }}
          ></div>

          <div className='bx--row article-heading'>
            <div className='bx--col-sm-3 bx--col-lg-3'>
              <h2>{name}</h2>
            </div>
          </div>

          <div className='bx--row article-text'>
            <div className='bx--col-sm-12 bx--col-lg-12'>
              <p dangerouslySetInnerHTML={{ __html: elements.articleText.value }}></p>
            </div>
          </div>
          <div className='bx--row article-form'>
            <FormComponent name={name} />
          </div>

          <div className='bx--row article-tags'>
            {tags.map((tag, index) => (
              <TagComponent title={tag} key={`${index}-${tag}`} />
            ))}
          </div>
        </Tile>
      </div>
    );
  } else {
    return <Loading description='loading indicator' small={false} withOverlay={false} />;
  }
}

export default Article;
