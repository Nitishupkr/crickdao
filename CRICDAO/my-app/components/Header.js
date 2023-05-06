import React, { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ethers } from "../node_modules/ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  const [network, setNetwork] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <div>
      <nav className={styles.header}>
        <div className={styles.logo}>
          <img
            alt="icon"
            src="/cricfinal2.jpg"
            width={100}
            height={100}
            className={styles.logo__img}
            />
          <a href={"/"}>
          <p className={styles.logo__title}>CricDAO</p>
          </a>
          <button
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
              console.log(isNavExpanded);
            }}
            className={styles.hamBtn}
          >
            {isNavExpanded ? "☰" : "✖"}
          </button>
        </div>

        <div
          className={`${styles.list} ${
            isNavExpanded ? styles.displayMenu : "list"
          }`}
        >
          <ul>
            <li>
              <Link href="/">
                <div className={styles.link}>Home </div>
              </Link>
            </li>
            <li>
              <Link href="/battle">
                <div className={styles.link}>Battle </div>
              </Link>
            </li>
            <li>
              <Link href="/marketplace">
                <div className={styles.link}>Marketplace </div>
              </Link>
            </li>
            <li>
              <Link href="/chatroom">
                <div className={styles.link}> ChatRoom </div>
              </Link>
            </li>
          </ul>
          <div className={styles.connectBtn}>
            <Link href="/account">
              <ConnectButton chainStatus="name" />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;

// <div className={styles.headercontainer}>
// <header>
//   <div>
//     <img
//       alt="icon"
//       src="/cricfinal2.jpg"
//       width={100}
//       height={100}
//       className={styles.logo}
//     />
//   </div>
//   <div className={styles.left}>
//     <p className={styles.title}> CricDAO</p>
//   </div>
//   <div className={styles.center}>
//     <ul>
//       <li>
//         <Link href="/">
//           <div>Home </div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/battle">
//           <div>Battle </div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/marketplace">
//           <div>Marketplace </div>
//         </Link>
//       </li>
//       <li>
//         <Link href="/chatroom">
//           <div> ChatRoom </div>
//         </Link>
//       </li>
//     </ul>
//   </div>

//   <div className={styles.right}>
//     <Link href="/account">
//       <ConnectButton chainStatus="name" />
//     </Link>
//   </div>
// </header>
// </div>
