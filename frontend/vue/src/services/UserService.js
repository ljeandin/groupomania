import http from "../http-common";

class UserServices {
    getAll() {
        return http.get("/user/signup");
    }
}

export default new UserServices();
