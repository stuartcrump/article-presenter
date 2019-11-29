import React, { Component } from 'react';
import { Tile } from 'carbon-components-react';
import { resourceUrl } from '../utils/constants';
import { Loading } from 'carbon-components-react';
import { apiUrl } from '../utils/constants';

class PersonalizedHeadline extends Component {
  constructor() {
    super();
    this.WRTP = window.acoustic && window.acoustic.personalization.JsWRTP.create();

    this.state = {
      image: '',
      title: '',
      text: '',
      personalized: false
    };
  }

  componentDidMount() {
    this.WRTP && this.WRTP.onReady(() => {
      const { headline } = this.props;
      let contentId = this.WRTP.getContentId('WelcomeBannerZone');

      if (contentId !== 'DCIDNF404') {
        const deliveryURL = `${apiUrl}delivery/v1/content/${contentId}&fl=document:[json]`;
        fetch(deliveryURL)
          .then(res => res.json())
          .then(result => {
            const { image, link, text, title } = result.elements;
            this.setState({
              image: image.value.image.url,
              title: title.value,
              text: text.value,
              link: link.value.url,
              personalized: true
            });
          })
          .catch(error => console.log('fetchError', error));
      } else {
        this.setState({
          image: headline.image && headline.image.value && headline.image.value.image && headline.image.value.image.url,
          title: headline.title && headline.title.value,
          text: headline.text && headline.text.value,
          link: headline.link && headline.link.value && headline.link.value.url,
          personalized: true
        });
      }
    });
  }

  render() {
    const { image, title, text, personalized } = this.state;

    if (personalized) {
      return (
        <Tile
          className='headline'
          id='WelcomeBannerZone'
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${resourceUrl}${image}) no-repeat center center`,
            backgroundSize: 'cover'
          }}
        >
          <h3>{title}</h3>
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </Tile>
      );
    } else {
      return <Loading description='Loading' withOverlay={false} />;
    }
  }
}

export default PersonalizedHeadline;
