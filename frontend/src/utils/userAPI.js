import instance from "../api";

const userAPI = {
  getUser: (userID) => {
    return instance.get("/api/user:userID");
  },
  postUser: async (payload) => {
    await instance.post("/api/user", payload);
    return;
  },
};

export default userAPI;
