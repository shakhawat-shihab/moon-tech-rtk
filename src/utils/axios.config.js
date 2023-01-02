import axios from 'axios';

let URL;

switch (process.env.REACT_APP_ENVIROMENT) {
    case "DEVELOPMENT":
        URL = "http://localhost:5000";
        break;
    case "PRODUCTION":
        URL = "https://server.com";
        break;
    default:
        URL = "http://localhost:5000";
}

const instanceOfAxios = axios.create({
    baseURL: URL,
})

export default instanceOfAxios;