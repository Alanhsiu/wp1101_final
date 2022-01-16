import React, { useState, useEffect } from "react";
import instance from "../api";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { Delete as DeleteIcon, Send as SendIcon } from "@material-ui/icons";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Select } from "antd";

const { Option } = Select;

const Wrapper = styled.section`
  position: absolute;
  top: 100px;
`;
const ResumeEdit = ({id,me,navigate}) => {
  const [subject3, setSubject3] = useState("none");
  const [subject2, setSubject2] = useState("none");
  const [subject1, setSubject1] = useState("none");
  const [lowPrice, setLowPrice] = useState();
  const [highPrice, setHighPrice] = useState();
  const [education, setEducation] = useState("")
  const [content, setContent] = useState("");
  const handleQueryResume = async () => {
    const queryString = id;
    const {data: {result} 
    } = await instance.get("/api/query_resume", {
      params: {
        type: "userId",
        queryString,
      },
    });
    if(result.result[0]!=='')
    {setSubject1(result.result[0]);
    setSubject2(result.result[1]);
    setSubject3(result.result[2]);
    setLowPrice(result.result[3])
    setHighPrice(result.result[4])
    setEducation(result.result[5])
    setContent(result.result[6])}
  };
  const handleSubmit = async () => {
    const trimmed_content = content.trim();
    const postId = uuidv4();
    const timestamp = Math.floor(Date.now() / 1000);
    if (lowPrice > 0 && highPrice > lowPrice) {
      await instance.post("/api/resume", {
        postId,
        id,
        me,
        subject1,
        subject2,
        subject3,
        trimmed_content,
        education,
        lowPrice,
        highPrice,
        timestamp,
      });
    }
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };
  useEffect(() => {
    handleQueryResume();
  }, []);
  const onGenderChange1 = (value) => {
    switch (value) {
      case "Math":
        setSubject1("Math");
        return;
      case "English":
        setSubject1("English");
        return;  
      case "Physics":
        setSubject1("Physics");
        return;
      case "Chemistry":
        setSubject1("Chemistry");
        return;   
      case "Geography":
        setSubject1("Geography");
        return;
      default:
        setSubject1("Others");
    }
  };
  const onGenderChange2 = (value) => {
    switch (value) {
      case "Math":
        setSubject2("Math");
        return;
      case "English":
        setSubject2("English");
        return;  
      case "Physics":
        setSubject2("Physics");
        return;
      case "Chemistry":
        setSubject2("Chemistry");
        return;   
      case "Geography":
        setSubject2("Geography");
        return;
      default:
        setSubject2("Others");
    }
  };  const onGenderChange3 = (value) => {
    switch (value) {
      case "Math":
        setSubject3("Math");
        return;
      case "English":
        setSubject3("English");
        return;  
      case "Physics":
        setSubject3("Physics");
        return;
      case "Chemistry":
        setSubject3("Chemistry");
        return;   
      case "Geography":
        setSubject3("Geography");
        return;
      default:
        setSubject3("Others");
    }
  }; 

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
            ResumeEdit
          </div>
          <br />
          <Form
            className="post-subject"
            style={{
              display: "flex",
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
              {me}
            </Form.Item>
            <Input.Group >
              <Form.Item
                label="Subject1"
                variant="outlined"
                className="post-subject"
                id="pid-create-subject"
                onChange={(e) => {
                  setSubject1(e.target.value);
                }}
              >
                <Select
                  placeholder="select subject"
                  onChange={onGenderChange1}
                  allowClear
                  value={subject1}
                  style={{ width: "30%" }}
                >
                  <Option value="Math">Math</Option>
                  <Option value="English">English</Option>
                  <Option value="Physics">Physics</Option>
                  <Option value="Chemistry">Chemistry</Option>
                  <Option value="Geogrphy">Geography</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Subject2"
                variant="outlined"
                className="post-subject"
                id="pid-create-subject"
                onChange={(e) => {
                  setSubject2(e.target.value);
                }}
              >
                <Select
                  placeholder="select subject"
                  onChange={onGenderChange2}
                  allowClear
                  value={subject2}
                  style={{ width: "30%" }}
                >
                  <Option value="Math">Math</Option>
                  <Option value="English">English</Option>
                  <Option value="Physics">Physics</Option>
                  <Option value="Chemistry">Chemistry</Option>
                  <Option value="Geogrphy">Geography</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Subject3"
                variant="outlined"
                className="post-subject"
                id="pid-create-subject"
                onChange={(e) => {
                  setSubject3(e.target.value);
                }}
              >
                <Select
                  placeholder="select subject"
                  onChange={onGenderChange3}
                  allowClear
                  value={subject3}
                  style={{ width: "30%" }}
                >
                  <Option value="Math">Math</Option>
                  <Option value="English">English</Option>
                  <Option value="Physics">Physics</Option>
                  <Option value="Chemistry">Chemistry</Option>
                  <Option value="Geogrphy">Geography</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Input.Group>
            <Form.Item
              label="Wage (/hr)"
              variant="outlined"
              className="post-price"
              id="pid-create-price"
              type="number"
            >
              <Input.Group compact>
                <Input
                  style={{ width: "20%" }}
                  onChange={(e) => {
                    setLowPrice(e.target.value);
                  }}
                  value={lowPrice}
                  placeholder="Minimum"
                />
                &nbsp;&nbsp;
                <Input
                  style={{ width: "20%" }}
                  onChange={(e) => {
                    setHighPrice(e.target.value);
                  }}
                  value={highPrice}
                  placeholder="Maximum"
                />
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="Acedemic Degree"
              variant="outlined"
              className="post-education"
              id="pid-create-education"
            >
              <Input.TextArea
                value={education}
                onChange={(e) => {
                  setEducation(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              variant="outlined"
              className="post-experience"
              id="pid-create-experience"
            >
              <Input.TextArea
                showCount
                value={content}
                maxLength={100}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
          <br />
          <div
            className="post-btn-wrapper"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              className="post-btn"
              startIcon={<SendIcon />}
              id="pid-create-submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="post-cancel-btn"
              endIcon={<DeleteIcon />}
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ResumeEdit


