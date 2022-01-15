import React from "react";
import { Modal } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";

const ContactModal = ({ visible, onOk, onCancel }) => {
  return (
    <Modal
      visible={visible}
      title="Contact us"
      okText="Ok"
      cancelText="Back"
      onOk={onOk}
      onCancel={onCancel}
    >
      <PhoneOutlined /> &nbsp;:&nbsp;0974147414
      <br />
      <MailOutlined />
      &nbsp;&nbsp;:&nbsp;b09907414@ntu.edu.tw
    </Modal>
  );
};

export default ContactModal;
