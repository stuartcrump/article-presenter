import { wchGetHubInfoFromBaseURL } from '@ibm-wch-sdk/utils';

const appName = 'acoustic-example'; // Enter your app name. 
const taxonomy = `ForReactApp`; // Enter your taxonomy name.
const headlineContentType = 'ReactAppHeadlines'; // Enter your Headline content type name.
const contentType = 'ReactAppArticles';  // Enter the Article content Type.

const developmentHubInfo = {
  apiUrl: { href: 'https://my10.digitalexperience.ibm.com/api/02df85f2-b4e9-4699-90a2-5c322475b2df/' },
  deliveryUrl: {
    href: 'https://my10.digitalexperience.ibm.com/02df85f2-b4e9-4699-90a2-5c322475b2df/',
    pathname: '02df85f2-b4e9-4699-90a2-5c322475b2df/'
  }
};
const hubInfo = process.env.NODE_ENV === 'development' ? developmentHubInfo : wchGetHubInfoFromBaseURL(new URL(window.location.href));
const apiUrl = hubInfo.apiUrl.href;
const resourceUrl = hubInfo.deliveryUrl.href;
const pathName = hubInfo.deliveryUrl.pathname;
const appPath = `${pathName}${appName}`;
const asJSON = '&fl=document:[json]';

console.log('hubinfo: ', hubInfo);
console.log('taxonomy: ', taxonomy);
console.log('headline content type:', headlineContentType);

export { apiUrl, resourceUrl, taxonomy, contentType, asJSON, headlineContentType, pathName, appPath };
