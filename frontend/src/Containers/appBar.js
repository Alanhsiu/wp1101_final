import React from "react";
import Logo from "./logo.svg";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Mail } from "@material-ui/icons";
import sessionAPI from "../utils/sessionAPI";
import { logout } from "../Components/slices/sessionSlice";
import { useDispatch } from "react-redux";
// import AccountCircle from '@mui/icons-material/AccountCircle';

function Appbar(props) {
  const dispatch = useDispatch();
  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar className="toolbar">
        <div className="appbar-left">
          <img
            className="logo"
            src="https://www.ntu.edu.tw/about/doc/Emblem72.jpg"
            alt="Logo"
            style={{ width:"50px" }}
          />
          <span className="app-name" onClick={() => props.navigate("/body")}>
            &nbsp;NTU TUTOR WEB
          </span>
        </div>
        <div className="appbar-left">
          <Mail
            onClick={() => props.navigate("/chatroom")}
            style={{
              fontWeight: "Bold",
              fontSize: 30,
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              paddingRight: "5px",
            }}
          />
          <Button color="inherit" onClick={() => props.navigate("/publish")}>
            Case Publish
          </Button>

          <Button
            color="inherit"
            onClick={() => props.navigate("/resumeDisplay")}
          >
            Profile
          </Button>
          <Button
            color="inherit"
            onClick={async() => {
              props.navigate("/");
              await sessionAPI.deleteSession()
              props.setSignedIn("false")
            }}
          >
            Log out
          </Button>
        </div>
        {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircle />
          </IconButton> */}
      </Toolbar>
    </AppBar>
  )
}


export default Appbar;
