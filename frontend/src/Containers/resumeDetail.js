import React, { useState, useEffect } from "react";
import moment from "moment";
import instance from "../api";

import { useParams } from "react-router-dom";
import { IconButton, Button, Typography } from "@material-ui/core";
import { Mail as MailIcon } from "@material-ui/icons";

function ResumeDetail(props) {
  const { pid } = useParams();
  const [resume, setResume] = useState(null);

  const getResumeDetail = async () => {
    const {
      data: { message, resume },
    } = await instance.get("/api/resumeDetail", { params: { pid } });
    setResume(resume);
    console.log("here"+resume);
    props.setChatPersonID(resume[1]);
  };

  useEffect(() => {
    console.log("ok");
    getResumeDetail();
  }, [pid]);

  return (
    <div className="article-wrapper">
      <div id="goback-btn">
        <Button
          variant="contained"
          color="primary"
          id="goback-reply-btn"
          onClick={() => props.navigate(-1)}
        >
          Back
        </Button>
      </div>

      {resume ? (
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {`Tutor's name : ${resume[0].userName}`}
            <IconButton
              className="post-delete"
              size="small"
              id="pid-detail-del-btn"
            >
              <MailIcon
                fontSize="inherit"
                onClick={() => props.navigate("/chatroom")}
              />
            </IconButton>
          </div>
          <div className="article-title" id="pid-detail-title">
            {`tutoring Subject : ${resume[0].subject1} / ${resume[0].subject2} / ${resume[0].subject3} `}
          </div>
          <div className="article-title" id="pid-detail-title">
            {`highest degree : ${resume[0].education}`}
          </div>
          <div className="article-title" id="pid-detail-title">
            {`wage : ${resume[0].lowPrice} ~ ${resume[0].highPrice}`}
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-content">
              {`description: ${resume[0].description}`}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="article-container">
          <h1>No such Resume</h1>
        </div>
      )}
    </div>
  );
}

export default ResumeDetail;
