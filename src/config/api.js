import axios from "axios";
import { HOST_COUNTRIES, HOST_PIXABAY, PIXABAY_API } from "./constants";


const getDataByName = async (name) => {

    let url = HOST_COUNTRIES + "name/" + name

    let config = {
      method: 'GET',
      maxBodyLength: Infinity,
      url
    };
    
   return await axios.request(config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response
    });
}

const getImages = async (name) => {
  let url = HOST_PIXABAY +"?key="+ PIXABAY_API + "&q=" + name + "&image_type=photo&order=popular&safesearch=true&pretty=true&per_page=20"

  let config = {
    method: 'GET',
    maxBodyLength: Infinity,
    url
  };
  
  return await axios.request(config)
  .then((response) => {
    return response
  })
  .catch((error) => {
    return error.response
  });
  

}

export {getDataByName, getImages}