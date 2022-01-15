import Message from "../Components/Message";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql";

const Messages = styled.div`
  height: calc(240px - 36px);
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const ChatBox = ({ username, friend }) => {
  // control the message scroll bar to the bottom (newest)
  const messagesFooter = useRef(null);

  const { data, loading, subscribeToMore } = useQuery(
    CHATBOX_QUERY,
    {
      variables: {
        name1: username,
        name2: friend,
      },
    }
  );

  const scrollToBottom = () => {
    messagesFooter.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  useEffect(() => {
    try {
      subscribeToMore({
        document: MESSAGE_SUBSCRIPTION,
        variables: { from: username, to: friend },
        updateQuery: (prev, { subscriptionData }) => {
          if(!subscriptionData.data)
            return prev;
          const newMsg = subscriptionData.data.message.message;
          return {
            ChatBox: {
              messages: [...prev.ChatBox.messages, newMsg],
            },
          };
        },
      });
    } catch (e) {
      console.log("subscribeToMore error: " + e);
    }
  }, [subscribeToMore]);

  if(loading) {
    return <p>loading...</p>;
  }
  return (
    <Messages>
      {data.ChatBox.messages.map(
        ({ sender: { name }, body}, i) => (
          <Message
            username={username}
            name={name}
            body={body}
            key={name + body + i}
          />
        )
      )}
      <div ref={messagesFooter} />
    </Messages>
  );
};

export default ChatBox;