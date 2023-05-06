import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://twitter.com/0xdhruva"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made by
        {/* <Image src="/twitter-logo.svg" alt="Twitter logo" width={30} height={35} /> */}
        @0xdhruva with ❤️
      </a>
    </footer>
  );
};

export default Footer;
