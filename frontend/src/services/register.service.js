import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/register");
  }

  get(id) {
    return http.get(`/register/${id}`);
  }

  create(data) {
    return http.post("/register", data);
  }

  update(id, data) {
    return http.put(`/register/${id}`, data);
  }

  delete(id) {
    return http.delete(`/register/${id}`);
  }

  deleteAll() {
    return http.delete(`/register`);
  }

}

export default new UserDataService();