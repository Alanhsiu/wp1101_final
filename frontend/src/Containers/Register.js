import { Button, Input, Space } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
  GlobalOutlined,
  SmileOutlined
} from "@ant-design/icons";
import Title from "../Components/Title";
import SignInBox from "../Components/SignInBox";
import { useState, React } from "react";
import userAPI from "../utils/userAPI";
import Border from "../Components/Border";
import PrimaryPinkButton from "../Components/primary-pink-button";
import OutlineGrayButton from "../Components/outline-gray-button";
import instance from "../api";

const Register = ({me,navigate}) => {
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUserID, setNewUserID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [registered, setRegistered] = useState(false);
  const [back, setBack] = useState(false);
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
      <Space direction="vertical" class="bodrer">
        <Border>
          <Input
            prefix={<UserOutlined />}
            value={newUserID}
            enterButton="Sign In"
            onChange={(e) => setNewUserID(e.target.value)}
            placeholder="UserID (帳號)"
            size="large"
          />
        </Border>
        <Border>
          <Input.Password
            prefix={<LockOutlined />}
            value={newPassword}
            placeholder="Password (密碼)"
            size="large"
            onChange={(e) => setNewPassword(e.target.value)}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Border>
        <Border>
          <Input
            prefix={<GlobalOutlined />}
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            placeholder="Real Name (中文姓名)"
            size="large"
          />
        </Border>
        <Border>
          <Input
            prefix={<SmileOutlined />}
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            placeholder="NTU Student ID (家長不必填)"
            size="large"
          />
        </Border>
      </Space>
      <SignInBox>
        <Space>
          <div
            onClick={() => {
              userAPI.postUser({
                userID: newUserID,
                password: newPassword,
                userName: newUserName,
              });
              instance.post("/api/verify", {studentID, newUserName});
              navigate("/");
            }}
          >
            <PrimaryPinkButton button="Register" />
          </div>
        </Space>
        <Space>
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <OutlineGrayButton button="Back" />
          </div>
        </Space>
      </SignInBox>
    </>
  );
};

export default Register;
