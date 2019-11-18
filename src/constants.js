import { wchGetHubInfoFromBaseURL } from '@acoustic-content-sdk/utils';

let env = 'prod';
const hubInfo =
  env === 'dev'
    ? {
        apiUrl: { href: 'https://my12.digitalexperience.ibm.com/api/ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/' },
        resourceUrl: { href: 'https://my12.digitalexperience.ibm.com/ab3cbc2c-b5e8-4b15-b68b-64fa31070f8b/' }
      }
    : wchGetHubInfoFromBaseURL(new URL(window.location.href));
const apiUrl = hubInfo.apiUrl.href;
const resourceUrl = hubInfo.resourceUrl.href;

const taxonomy = `ForReactApp`; // Enter your taxonomy name.
const headlineContentType = 'ReactAppHeadlines'; // Enter your Headline content type name.
const asJSON = '&fl=document:[json]';

console.log(env);
export { apiUrl, resourceUrl, taxonomy, asJSON, headlineContentType };
