import React from "react";
import styles from "../../styles/Home.module.css";
import Image from "next/image";
import sample from "../assets/virat.png";
import Mint from "./Mint";

export default function (prop) {
  return (
    <>
      <div className={styles.player_card}>
        {/* <h1>Virat Kohli</h1> */}
        <h1>{prop.name} </h1>
        <h2>{prop.number}</h2>
        {/* <Date></Date> */}
        <span className={styles.battle}>
          <div className={styles.player_img}>
            <img className={styles.player_img} src={prop.image} />
            {/* <Image src={sample} /> */}
          </div>
        </span>
        {/* <h2>Batsman</h2> */}
        <h2>{prop.position}</h2>
        <p>{prop.description}</p>
        {/* <p>
        {
          prop.rating ? `Rating: ${prop.rating}` : ""
      }
      </p> */}
        {/* <button className={styles.play_btn}>Mint NFT</button> */}
        <Mint _id={prop.id} />
      </div>
    </>
  );
}
