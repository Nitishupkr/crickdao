import React from "react";
import Head from "next/head";
import styles from "../styles/chatroom.module.css";

const ChatRoom = () => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.container1}>
          <h1 className={styles.title1}>
            Join the community of{" "}
            <h1 className={styles.title3}>cricket Lovers</h1>
          </h1>
          <h2 className={styles.title2}>
            Want to chat with fellow members about ongoing matches, Join the
            community discord server now . Get to meet cricket fans , play games
            and have fun.
          </h2>
          {/* <button id='myButton' className={styles.button}>
            <script type="text/javascript">
              document.getElementById("myButton").onclick = function () {
                location.href = "https://discord.gg/aTEwNUnQ" };
            </script>
            <img src='/discord.png' alt='discord logo' className={styles.img2} />
          </button> */}
          <div>
            <form action="https://discord.gg/aTEwNUnQ">
              <button type="submit" className={styles.button}>
                <img
                  src="/discord.png"
                  alt="discord logo"
                  className={styles.img2}
                />
              </button>
            </form>
          </div>
        </div>
        <div className="imgcontainer">
          <img
            src="/discordserver.png"
            className={styles.img}
            alt="Discord Server"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
