import { createSlice } from "@reduxjs/toolkit";
import SessionAPI from "../../utils/sessionAPI";

export const sessionSlice = createSlice({
  name: "session",
  initialState: {
    initialized: false,
    isLogin: false,
    isVerified: false,
    userID: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLogin = true;
      state.isVerified = action.payload.isVerified;
      state.userID = action.payload.userID;
    },
    setLogout: (state) => {
      state.isLogin = false;
      state.isVerified = false;
      state.userID = null;
    },
    setInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const init = () => async (dispatch) => {
  try {
    const session = await SessionAPI.getSession();
    if (session.status === 200) {
      console.log("success")
      dispatch(setLogin(session.data));
      dispatch(setInitialized());
    }
  } catch (err) {
    dispatch(setInitialized());
  }
};

export const logout = () => async (dispatch) => {
  const session = await SessionAPI.deleteSession();
  dispatch(setLogout());
};

export const { setLogin, setLogout, setInitialized } = sessionSlice.actions;

export const selectSession = (state) => state.session;

export default sessionSlice.reducer;
