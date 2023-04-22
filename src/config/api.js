import axios from "axios";
import { HOST } from "./constants";


const getDataByName = async (name) => {

    let url = HOST + "name/" + name

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

export {getDataByName}