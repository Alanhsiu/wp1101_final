import { Modal, Input } from "antd";
import { useState } from "react";

const ChatModal = ({ visible, onCreate, onCancel,  chatPersonID}) => {
  const [name, setName] = useState(chatPersonID);

  const handleOk = () => {
    onCreate(name);
    setName("");
  }

  const handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      handleOk();
    }
  }

  return (
    <Modal
        title="Open a ChatBox"
        visible={visible}
        onCancel={onCancel}
        onOk={handleOk}
        >
      <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={chatPersonID}
      />
    </Modal>
  );
};

export default ChatModal;