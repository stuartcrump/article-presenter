import axios from "axios";
const baseURL = "//my12.digitalexperience.ibm.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/";

function getCategoryItems(category) {
  const deliveryURL = `delivery/v1/search?q=*:*&fl=name,document,id,classification,type,status&fq=classification:content&fq=categoryLeaves:${category}`;
  return axios(`${baseURL}${deliveryURL}`)
}

export { getCategoryItems };
