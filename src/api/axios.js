import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "d5aacac98be01d245812627f409bd0db",
        language: "ko-KR"
    }
});

export default instance;