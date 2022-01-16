import ResumeDisplay from "./ResumeDisplay";
import ResumeEdit from "./ResumeEdit";
import { useState } from "react";
const Profile = (props) => {
  const [edit, setEdit] = useState(false);
  return  edit === true  ? <ResumeEdit setEdit={setEdit}/> : <ResumeDisplay setEdit={setEdit}/>;
};

export default Profile;