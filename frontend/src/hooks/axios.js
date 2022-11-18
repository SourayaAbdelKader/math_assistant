import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v0/" ;
axios.defaults.headers = {
  Authorization : secureLocalStorage.getItem('token')?'Bearer '+secureLocalStorage.getItem('token').trim():undefined,
  'Content-Type': 'application/json'
}

class Base {

  async get(url, params = {}){
    try {
      const data = await axios.get(url, { params });
      return data
    } catch (e){
      return { success: false, error: e}
    }
  }
  async post(url, body){
    try {
      const data = await axios.post(url, body);
      return data;
    } catch (e){
      return { success: false, error: e}
    }
  }

}

export default Base;