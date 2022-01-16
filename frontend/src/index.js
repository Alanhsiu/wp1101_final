import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./Containers/App";
import reportWebVitals from "./reportWebVitals";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { BrowserRouter } from "react-router-dom";
import store from "./store";

const generateWsLink = () => {
  // REACT_APP_BASE_URL = http://localhost:4000
  // protocol: http:
  // host: localhost:4000
  // origin: localhost:4000
  const { protocol, host, origin } = new URL(process.env.REACT_APP_BASE_URL);
  let wsPrefix = "";
  if (protocol === "https:") {
    wsPrefix = "wss://";
  }
  else wsPrefix = "ws://";
  return [origin + "/graphql", wsPrefix + host];
}

// Create an http link:
const httpLink = new HttpLink({
  uri: generateWsLink()[0],
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: generateWsLink()[1],
  options: { reconnect: true },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore({}),
});
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#DC004E",
    },
  },
});

ReactDOM.render(

  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
