import axios from "axios";
const baseURL = "//my12.digitalexperience.ibm.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/";

function getCategoryItems(category, isTag) {
  let deliveryURL = `delivery/v1/search?q=*:*&fl=name,document,id,classification,type,status&fq=classification:content&fq=categoryLeaves:"${category}"`;

  if (isTag) {
    deliveryURL = `delivery/v1/search?q=classification:content%20AND%20tags:"${category}"&fl=name&fl=classification&fl=tags&fl=document:[json]`;
  }

  return axios(`${baseURL}${deliveryURL}`);
}

export { getCategoryItems };
