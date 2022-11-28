import axios from "axios";

const linkstart = "http://localhost:3000/";

class advisorDataService {
    getAll() {
        return axios.get(linkstart + "advisor/");
    }

    searchAdvisor(id) {
        return axios.get(linkstart + "advisor/search/" + id);
    }
}

export default new advisorDataService();