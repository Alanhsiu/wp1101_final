import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ScoreCardProvider } from "../hooks/useScoreCard";

import { useStyles } from "../hooks";
import axios from "../api";
import { useScoreCard } from "../hooks/useScoreCard";

const Wrapper = styled.section`
  position: absolute;
  top: 100px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const Body = ({navigate, me,id}) => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState(0);

  const [queryType, setQueryType] = useState("name");
  const [queryString, setQueryString] = useState("");

  const [tabType, setTab] = useState("Resume");
  const [queries, setQueries] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");

  const handleNumber = (func) => (event) => {
    if (event.target.value >= 0) {
      func(event.target.value);
    } else {
      func(0);
    }
  };
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const refresh = async (Tab) => {
    if (Tab === "Resume") {
      console.log("resume");
      const {
        data: { message, data },
      } = await axios.get("/api/query_all_resume");
      setQueries(data);
    } else {
      console.log("case");
      const {
        data: { message, data },
      } = await axios.get("/api/query_all_cases");
      setQueries(data);
    }
  };

  useEffect(() => {
    // refresh();
    console.log("lesgoogogo");
    refresh(tabType);
  }, []);

  const handleAdd = async () => {
    const {
      data: { message, card },
    } = await axios.post("/api/create-card", {
      subject,
      price,
    });
    setQueries(card);
    if (!card) addErrorMessage(message);
    else addCardMessage(message);
  };

  const handleQueryResume = async () => {
    const {
      data: { result },
    } = await axios.get("/api/query_resume", {
      params: {
        type: queryType,
        queryString,
      },
    });
    console.log(result.query);
    setQueries(result.query);
    if (!messages) addErrorMessage(messages);
    else addRegularMessage(...messages);
  };

  const handleQueryCases = async () => {
    const {
      data: { message },
    } = await axios.get("/api/query_case", {
      params: {subject, price },
    });
    console.log(message);
    setQueries(message);
    if (!messages) addErrorMessage(message);
    else addRegularMessage(...messages);
  };

  //subject price region
  return (
    <ScoreCardProvider>
      {/* <div className="board-navbar">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.navigate("/publish")}
        >
          Case Publish
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.navigate("/resume")}
        >
          Edit Resume
        </Button>
      </div> */}
      <Wrapper>
        <Tabs
          variant="fullWidth"
          value={tabType}
          onChange={(event, newTab) => {
            setTab(newTab);
            refresh(newTab);
          }}
        >
          <Tab label="Find Teachers" value="Resume" id="add" />
          <Tab label="Find Cases" value="Case" id="query" />
        </Tabs>
        {tabType === "Resume" ? (
          <Row style={{ height: "50px" }}>
            <StyledFormControl>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={queryType}
                  onChange={handleChange(setQueryType)}
                >
                  <FormControlLabel
                    value="name"
                    control={<Radio color="primary" />}
                    label="Name"
                  />
                  <FormControlLabel
                    value="subject"
                    control={<Radio color="primary" />}
                    label="Subject"
                  />
                </RadioGroup>
              </FormControl>
            </StyledFormControl>
            <TextField
              placeholder="Type here..."
              value={queryString}
              onChange={handleChange(setQueryString)}
              style={{ width: 240 }}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={!queryString}
              onClick={handleQueryResume}
            >
              Query
            </Button>
          </Row>
        ) : (
          <Row style={{ height: "50px" }}>
            <TextField
              className={classes.input}
              placeholder="Subject"
              style={{ width: 240 }}
              value={subject}
              onChange={handleChange(setSubject)}
            />
            <TextField
              className={classes.input}
              placeholder="Lowest Price"
              value={price}
              onChange={handleNumber(setPrice)}
              type="number"
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleQueryCases}
            >
              SEARCH
            </Button>
          </Row>
        )}
        <br />
        <div className="board-discuss-container">
          <div className="articles-container">
            {(tabType === "Resume")?
              queries.map((post, i) => (
              <div className="article-post" key={i} id={`pid-${i}`}>
                <div className="article-prefix">
                  <span className="each-tag">{`[ ${post.userName} ]`}</span>
                  <hr />
                  <span
                    className="each-id"
                    id={`pid-${i}-title`}
                    onClick={() =>navigate(`/resumeDetail/${post.postId}`)}
                  >
                    for more information.....
                  </span>
                  <hr />
                  <span>{`ideal wage: ${post.lowPrice} ~ ${post.highPrice}`}</span>
                </div>
              </div>))
              :
              queries.map((post, i) => (
              <div className="article-post" key={i} id={`pid-${i}`}>
                <div className="article-prefix">
                  <span className="each-tag">{`[ ${post.subject} ]`}</span>
                  <hr />
                  <span
                    className="each-id"
                    id={`pid-${i}-title`}
                    onClick={() =>navigate(`/caseDetail/${post.postId}`)}
                  >
                    for more information.....
                  </span>
                  <hr />
                  <span>{`offering: ${post.lowPrice} ~ ${post.highPrice}`}</span>
                </div>
              </div>))
            }
          </div>
        </div>
      </Wrapper>
    </ScoreCardProvider>
  );
};

export default Body;
