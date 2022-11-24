import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/user/${id}`);
  }

  create(data) {
    return http.post("/user", data);
  }

  update(id, data) {
    return http.put(`/user/${id}`, data);
  }

  delete(id) {
    return http.delete(`/user/${id}`);
  }

  deleteAll() {
    return http.delete(`/user`);
  }

  findByUsername(id) {
    return http.get(`/user/${id}`);
  }
}

export default new UserDataService();