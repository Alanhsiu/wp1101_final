import { Button, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import Title from "../Components/Title";
import SignInBox from "../Components/SignInBox";
import { useState, React } from "react";
import PrimaryPinkButton from "../Components/primary-pink-button";
import OutlineGrayButton from "../Components/outline-gray-button";
import projectStyles from "../style.module.css";
import styles from "./home.module.css";
import Border from "../Components/Border";
import sessionAPI from "../utils/sessionAPI";
import instance from "../api";

const SignIn = ({
  me,
  setMe,
  id,
  setId,
  displayStatus,
  setSignedIn,
  navigate,
}) => {
  const [password, setPassword] = useState("");
  const [userID, setUserID] = useState("");
  return (
    <>
      <Title>
        <h1
          onClick={() => {
            navigate("/");
          }}
        >
          NTU Tutor
        </h1>
      </Title>
      <SignInBox>
        <Space
          direction="vertical"
          class="bodrer"
          // style={{ backgroundColor: "PowderBlue" }}
        >
          <Border>
            <Input
              prefix={<UserOutlined />}
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              placeholder="UserID (帳號)"
              size="large"
              font-weight="bold"
              outline="none"
            />
          </Border>
          <Border>
            <Input.Password
              prefix={<LockOutlined />}
              value={password}
              placeholder="Password (密碼)"
              size="large"
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              font-weight="bold"
            />
          </Border>
        </Space>
        <Space>
          <div
            className={styles["container03"]}
            onClick={async () => {
              if (!userID)
                displayStatus({
                  type: "error",
                  msg: "Missing Username",
                });
              else if (!password) {
                displayStatus({
                  type: "error",
                  msg: "Missing Password",
                });
              } else {
                console.log("go");
                const temp = await sessionAPI.postSession({ userID, password });
                await console.log(temp);
                setMe(temp[1]);
                setId(temp[0]);
                setSignedIn(true);
                setTimeout(() => {
                  navigate("/body");
                }, 300);
              }
            }}
          >
            <PrimaryPinkButton button="Sign In" />
          </div>
        </Space>
        <Space>
          <div
            className={styles["container03"]}
            onClick={() => {
              navigate("/register");
            }}
          >
            <OutlineGrayButton button="Register" />
          </div>
        </Space>
      </SignInBox>
    </>
  );
};
export default SignIn;
