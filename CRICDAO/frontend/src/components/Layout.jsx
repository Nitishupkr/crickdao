import React, { useState } from "react";
import styles from "../../styles/Layout.module.css";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo1.svg";
import discord from "../assets/discord.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Layout({ children }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <span className={styles.logo}>
            <Link href={"/"}>CricDAO</Link>
          </span>
          <ul
            className={
              isActive === false
                ? styles.navmenu
                : styles.navmenu + " " + styles.active
            }
          >
            <li className={styles.navitem}>
              <Link href="/">
                <a className={styles.navlink}>Home</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/battle">
                <a className={styles.navlink}>Battle</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/players">
                <a className={styles.navlink}>Players</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              <Link href="/account">
                <a className={styles.navlink}>Account</a>
              </Link>
            </li>
            <li className={styles.navitem}>
              {/* <button className={styles.connect}> */}
                <ConnectButton />
              {/* </button> */}
            </li>
          </ul>

          <button
            onClick={handleClick}
            className={
              isActive === false
                ? styles.hamburger
                : styles.hamburger + " " + styles.active
            }
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </nav>
      </header>

      {children}

      <div className={styles.container}>
        <footer className={styles.footer}>
          Built by{" "}
          <a
            target="_blank"
            href="https://twitter.com/0xdhruva"
            rel="noopener noreferrer"
          >
            Dhruv
          </a>
          <span>&</span>
          <a
            target="_blank"
            href="https://twitter.com/kushagrasarathe"
            rel="noopener noreferrer"
          >
            Kushagra
          </a>
          &#9749;
        </footer>
      </div>
    </>
  );
}
