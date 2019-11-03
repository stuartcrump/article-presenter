import axios from "axios";
const baseURL = "//my12.digitalexperience.ibm.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/";

function getArticle(id) {
  const deliveryURL = `delivery/v1/content/${id}`;
  return axios(`${baseURL}${deliveryURL}`);
}

export { getArticle };
