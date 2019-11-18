import { wchGetHubInfoFromBaseURL } from '@acoustic-content-sdk/utils';
const developmentHubInfo = {
  apiUrl: { href: 'https://my4.digitalexperience.ibm.com/api/ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/' },
  resourceUrl: {
    href: 'https://my4.digitalexperience.ibm.com/ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/',
    pathname: 'ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/'
  }
};

const hubInfo = process.env.NODE_ENV === 'development' ? developmentHubInfo : wchGetHubInfoFromBaseURL(new URL(window.location.href));
const apiUrl = hubInfo.apiUrl.href;
const resourceUrl = hubInfo.resourceUrl.href;
const pathName = hubInfo.resourceUrl.pathname;

const taxonomy = `ForReactApp`; // Enter your taxonomy name.
const headlineContentType = 'ReactAppHeadlines'; // Enter your Headline content type name.
const asJSON = '&fl=document:[json]';

console.info('hubinfo', hubInfo, process.env.NODE_ENV);
export { apiUrl, resourceUrl, taxonomy, asJSON, headlineContentType, pathName };
