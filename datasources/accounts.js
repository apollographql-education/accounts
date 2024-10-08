const { RESTDataSource } = require("@apollo/datasource-rest");
require("dotenv").config();

class AccountsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.SERVICE_URL || "http://localhost:4011/";
  }

  login(username) {
    return this.get(`login/${username}`);
  }

  updateUser({ userId, userInfo }) {
    return this.patch(`user/${userId}`, { body: { ...userInfo } });
  }

  getUser(userId) {
    return this.get(`user/${userId}`);
  }

  getGalacticCoordinates(userId) {
    return this.get(`user/${userId}/coordinates`);
  }
}

module.exports = AccountsAPI;
