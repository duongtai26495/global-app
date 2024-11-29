import axios from "axios";
import { HOST_COUNTRIES, HOST_PIXABAY, PIXABAY_API } from "./constants";


const getDataNation = async (keyword, type, fullText) => {
  let url = HOST_COUNTRIES;
  
  switch(type){
    
    case "code": url = HOST_COUNTRIES + "alpha/" + keyword
    break
    case "capital" : url = HOST_COUNTRIES + type +"/"+keyword
    default: url = HOST_COUNTRIES + type +"/"+ keyword + "?fullText="+ (fullText === true ? "true" : "false")
    break
  }


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

const getImages = async (name, page) => {
  let url = HOST_PIXABAY +"?key="+ PIXABAY_API + "&q=" + name + "&image_type=photo&order=popular&safesearch=true&pretty=true&per_page=10&page="+page

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

export {getDataNation, getImages}