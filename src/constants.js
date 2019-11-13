const hubId = '859f2008-a40a-4b92-afd0-24bb44d10124'; // Enter your content hub ID
const taxonomy = `ForReactApp`; // Enter your taxonomy name
const headlineBackground = 'https://cdn.pixabay.com/photo/2015/09/04/23/42/guitar-923229_960_720.jpg'; // headline component background Image
const secondlineBackground = 'https://cdn.pixabay.com/photo/2015/09/04/23/42/guitar-923229_960_720.jpg'; // headline component background Image

const asJSON = '&fl=document:[json]';
const baseURL = `https://my12.digitalexperience.ibm.com/`;
const tenantURL = `${baseURL}/api/${hubId}/`;
export { baseURL, tenantURL, taxonomy, asJSON, headlineBackground, secondlineBackground };
