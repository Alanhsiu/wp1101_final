import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../Components/slices/sessionSlice";

export default configureStore({
  reducer: {
    session: sessionReducer,
  },
});
