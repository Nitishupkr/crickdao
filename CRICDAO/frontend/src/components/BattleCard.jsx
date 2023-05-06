import React from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import logo_India from "../assets/India.png";
import logo_Australia from "../assets/Australia_Logo.jpg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bid from "./Bid";

export default function () {
  return (
    <div className={styles.battle_card}>
      <h1>Match 1</h1>
      <span>Sun Jul 31 2022 15:00:00 GMT+0530 IST</span>
      <span className={styles.battle}>
        <div className={styles.team_logo}>
          {/* <Image src={logo_India} /> */}
          <h1>India</h1>
        </div>
        <span className={styles.vs}>vs</span>
        <div className={styles.team_logo}>
          {/* <Image src={logo_Australia} /> */}
          <h1>England</h1>
        </div>
      </span>
      <Bid />
      {/* <p>Lorem ipsum dolor sit perspiciatis ea rem eos itaque sapiente voluptatum? Cupiditate iure recusandae atque blanditiis labore exercitationem animi porro.</p> */}
      {/* <button className={styles.play_btn}>Predict</button> */}
    </div>
  );
}
