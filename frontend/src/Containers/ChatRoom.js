import { Button, Input, Tabs } from "antd";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql";
import styled from "styled-components";
import Title from "../Components/Title";
import ChatBox from "./ChatBox";
import ChatModal from "./ChatModal";
import useChatBox from "../hooks/useChatBox";

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  display: flex;
`;

const ChatRoom = ({ me, displayStatus, chatPersonID, setChatPersonID }) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
  const [modalVisible, setModalVisible] = useState(true);

  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);

  const addChatBox = () => {
    setModalVisible(true);
  };

  const loadChatPerson = async (chatPersonID) => {
    await startChat({
      variables: {
        name1: me,
        name2: chatPersonID,
      },
    });
    setActiveKey(createChatBox(chatPersonID));
  };

  return (
    <>
      <Title>
        <h2>Chat Room</h2>
        {/* <Button type="primary" danger >
          onClick={clearMessages}
          Clear
        </Button> */}
      </Title>
      <>
        <Wrapper
          tabBarStyle={{ height: "36px" }}
          type="editable-card"
          activeKey={activeKey}
          onChange={(key) => {
            setActiveKey(key);
          }}
          onEdit={(targetKey, action) => {
            if (action === "add") {
              addChatBox();
            } else if (action === "remove") {
              setActiveKey(removeChatBox(targetKey, activeKey));
            }
          }}
        >
          {chatBoxes.map((friend) => (
            <Tabs.TabPane tab={friend} closable={true} key={friend}>
              <ChatBox username={me} friend={friend} key={friend} />
            </Tabs.TabPane>
          ))}
        </Wrapper>
        <ChatModal
          chatPersonID={chatPersonID}
          visible={modalVisible}
          onCreate={async (name) => {
            console.log(name);
            await startChat({
              variables: {
                name1: me,
                name2: name,
              },
            });

            setActiveKey(createChatBox(name));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </>
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: "error",
              msg: "Please enter a username and a message body.",
            });
            return;
          }
          sendMessage({
            variables: {
              from: me,
              to: activeKey,
              message: msg,
            },
          });
          setMessageInput("");
        }}
      ></Input.Search>
    </>
  );
};

export default ChatRoom;
