import React, { useState, useEffect } from "react";
import instance from "../api";
import axios from "../api";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Edit,
} from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const Wrapper = styled.section`
  position: absolute;
  top: 100px;
`;

const ResumeDisplay = ({ id, me, navigate }) => {
  const [show, setShow] = useState([]);
  const queryString = id;
  const handleQueryResume = async () => {
    const {
      data: { result },
    } = await axios.get("/api/query_resume", {
      params: {
        type: "userId",
        queryString,
      },
    });
    setShow(result.result);
  };
  useEffect(() => {
    handleQueryResume();
  }, []);

  return (
    <Wrapper>
    <div className="post-wrapper">
      <div className="post-text-container">
        <div
          style={{
            fontWeight: "Bold",
            fontSize: 36,
            display: "flex",
            justifyContent: "center",
          }}
        >
          ResumeDisplay
          <Edit 
          style={{
            fontWeight: "Bold",
            fontSize: 45,
            display: "flex",
            justifyContent: "center",
            paddingLeft:"15px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/resumeEdit")}/>
        </div>
        <br />
        <Form
          className="post-subject"
          style={{
            display: "left",
            flexDirection: "column",
            justifyContent: "start",
            // alignItems: "center",
            margin: "auto",
          }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Name"
            variant="outlined"
            className="post-subject"
            id="pid-create-subject"
          >
            {`${me}`}
          </Form.Item>
          <Form.Item
            label="Subject1"
            variant="outlined"
            className="post-subject"
            id="pid-create-subject"
          >
            {show[0]}
          </Form.Item>
          <br />
            <Form.Item
              label="Subject2"
              variant="outlined"
              className="post-subject"
              id="pid-create-subject"
            >
              {show[1]}
            </Form.Item>
            <Form.Item
              label="Subject3"
              variant="outlined"
              className="post-subject"
              id="pid-create-subject"
            >
              {show[2]}
            </Form.Item>
            <Form.Item
              label="Wage (/hr)"
              variant="outlined"
              className="post-price"
              id="pid-create-price"
              type="number"
            >
              {show[3]}
              <Input
                className="site-input-split"
                style={{
                  width: 30,
                  borderLeft: 0,
                  borderRight: 0,
                  pointerEvents: "none",
                }}
                placeholder="~"
                disabled
              />
              {show[4]}
            </Form.Item>
            <Form.Item
              label="Acedemic Degree"
              variant="outlined"
              className="post-experience"
              id="pid-create-experience"
            >
              {show[5]}
            </Form.Item>
            <Form.Item
              label="Description"
              variant="outlined"
              className="post-experience"
              id="pid-create-experience"
            >
              {show[6]}
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResumeDisplay;
