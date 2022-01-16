import instance from "../api";
import qs from "qs";

const sessionAPI = {
  getSession: async() =>await instance.get("/api/session"),
  postSession: async(payload) => {
    console.log(payload);
    
    const a  = await instance.post("/api/session", payload)
    const temp = [a.data.userID, a.data.userName]
    console.log(temp)
    return temp
     ;
  },
  deleteSession: async() =>await instance.delete("/api/session"),
};

export default sessionAPI;
