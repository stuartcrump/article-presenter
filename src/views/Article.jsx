import React, { useEffect, useState } from 'react';
import { Tile, Loading } from 'carbon-components-react';
import { apiUrl, resourceUrl } from '../utils/constants';
import TagComponent from '../components/Tag';
import FormComponent from '../components/Form';
import rxFetch from '../utils/helpers';
import { useParams } from 'react-router-dom';
import './Article.scss';

function Article() {
  const [article, setArticle] = useState({
    name: 'Default Name',
    elements: {
      articleImage: { value: { image: { url: '' } } },
      articleText: { value: 'Default Text' }
    },
    tags: [],
    error: false,
    message: 'Error'
  });
  const [fetched, setFetched] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const deliveryURL = `${apiUrl}delivery/v1/content/${id}&fl=document:[json]`;
    const article$ = rxFetch(deliveryURL).subscribe({
      next: response => setArticle(response),
      complete: () => setFetched(true)
    });

    return () => article$.unsubscribe();
  }, [id]);

  if (fetched) {
    const { name, elements, tags, error, message } = article;
    if (error) {
      return (
        <div className='bx--grid bx--grid--full-width article'>
          <h2>{message}</h2>
        </div>
      );
    } else {
      const text = elements && elements.articleText && elements.articleText.value;
      const image =
        elements &&
        elements.articleImage &&
        elements.articleImage.value &&
        elements.articleImage.value.image &&
        elements.articleImage.value.image.url;
      return (
        <div className='bx--grid bx--grid--full-width'>
          <Tile className='article'>
            <div
              className='bx--row article-image'
              style={{
                background: `url(${resourceUrl}${image}) no-repeat center center`,
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
                <p dangerouslySetInnerHTML={{ __html: text }}></p>
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
    }
  } else {
    return <Loading description='loading' small={false} withOverlay={false} />;
  }
}

export default Article;
