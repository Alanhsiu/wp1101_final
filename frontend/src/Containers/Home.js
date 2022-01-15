import React from "react";
import PrimaryPinkButton from "../Components/primary-pink-button";
import OutlineGrayButton from "../Components/outline-gray-button";
import projectStyles from "../style.module.css";
import styles from "./home.module.css";
import ContactModal from "./ContactModal";
import { useState } from "react";

const Home = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <div className={styles["container"]}>
      <div className={styles["Hero"]}>
        <div className={styles["container01"]}>
          <div className={styles["Card"]}>
            <h1
              className={` ${styles["text"]} ${projectStyles["headingOne"]} `}
            >
              NTU TUTOR WEB
            </h1>
            <h1
              className={` ${styles["text01"]} ${projectStyles["headingOne"]} `}
            >
              台大家教網
            </h1>
            <span className={` ${styles["text02"]} ${projectStyles["lead"]} `}>
              <span>
                {/* Find the story of Creative Tim&apos;s most complex design */}
                臺灣大學家教網是一所積極新創、學科齊全、學術實力雄厚、辦學特色鮮明，在國際上具有重要影響力與競爭力的綜合性家教網，在多個學術領域具有非常前瞻的科技實力，擁有世界一流的實驗室與師資力量，各種排名均位於全球前列。歡迎大家報名台大家教網。
                <span
                  dangerouslySetInnerHTML={{
                    __html: " ",
                  }}
                />
              </span>
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <div
                className={styles["container03"]}
                onClick={() => {
                  props.navigate("/login");
                }}
              >
                <OutlineGrayButton button="get started"></OutlineGrayButton>
              </div>
              <div
                className={styles["container03"]}
                onClick={() => {
                  setModalVisible(true);
                }}
              >
                <PrimaryPinkButton button="contact us"></PrimaryPinkButton>
              </div>
            </div>
          </div>
          <ContactModal
            visible={modalVisible}
            onOk={() => {
              setModalVisible(false);
            }}
            onCancel={() => {
              setModalVisible(false);
            }}
          />
        </div>
      </div>
      <img
        alt="image"
        src="https://egoldenyears.com/wp-content/uploads/2018/09/201800926_a0312.jpg.jpg"
        className={styles["image04"]}
      />
    </div>
  );
};

export default Home;
