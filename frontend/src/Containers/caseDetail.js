import React, { useState, useEffect } from "react";
import moment from "moment";
import instance from "../api";

import { useParams } from "react-router-dom";
import { IconButton, Button, Typography } from "@material-ui/core";
import { Mail as MailIcon } from "@material-ui/icons";

function CaseDetail(props) {
  const { pid } = useParams();
  const [cases, setCases] = useState(null);

  // TODO 3-(2): complete getPostDetail function to get the full information of a post from database
  const getCaseDetail = async () => {
    const {
      data: { message, cases },
    } = await instance.get("/api/caseDetail", { params: { pid } });
    setCases(cases);
    console.log(cases);
    props.setChatPersonID(cases[1]);
  };

  // TODO 3-(2): fetch the full information of a post from database
  useEffect(() => {
    getCaseDetail();
    console.log("ok");
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
      {cases ? (
        <div className="article-container">
          <div className="article-title" id="pid-detail-title">
            {`Parent's name : ${cases[0].userName} `}
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
            {`Subject : ${cases[0].subject}`}
          </div>
          <div className="article-title" id="pid-detail-title">
            {` offer : ${cases[0].lowPrice} ~ ${cases[0].highPrice} per hour`}
          </div>
          <div className="article-title" id="pid-detail-title">
            {` area : ${cases[0].area} `}
          </div>
          <div className="article-content-container">
            <Typography component={"span"} id="pid-detail-content">
              {cases[0].description}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="article-container">
          <h1>No such Cases</h1>
        </div>
      )}
    </div>
  );
}

export default CaseDetail;
