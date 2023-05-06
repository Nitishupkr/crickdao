import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import hero from "../src/assets/hero1.png";
import hero from "../src/assets/virat.png";
import nft from "../src/assets/cricDAO.gif";
import roadmap from "../src/assets/roadmap.svg";
import image from "../src/assets/cric.webp";
import stumps from "../src/assets/stumps.svg";
import logo from "../src/assets/logo.svg";
import MintNFT from "../src/components/MintNFT";
import Whitelist from "../src/components/Whitelist";

export default function Home() {
  return (
    <div className={styles.contsainer}>
      <div className={styles.hero_section}>
        <div className={styles.hero_content}>
          <h1>CricDAO is a one-stop platform for cricket lovers</h1>
          <p>
            You can trade player NFTs in the marketplace and participate in
            battles where you can predict macth result and win rewards.
          </p>
          {/* <button className={styles.redirect_button}> */}
            <Whitelist />
          {/* </button> */}
        </div>
        <div className={styles.hero_image}>
          <Image src={hero} />
        </div>
        {/* <div className={styles.roadmap}>
          <Image className={styles.roadmap} src={roadmap} />
        </div> */}
      </div>

      <div className={styles.features_section}>
        <div>
          <h1>Key Features</h1>

          <li>Community for Cricket Lovers</li>
          <li>CricDAO is a DAO & NFT based gaming platform</li>
          <li>You can become DAO member by purchasing a DAO NFT.</li>
          <li>You can buy Player NFTs , trade and play games with them.</li>
          <li>You can also predict match result and win rewards</li>
        </div>
        {/* <button className={styles.redirect_button}>Join CricDAO</button> */}
      </div>

      <div className={styles.mint_heading}>
        <h1>Mint NFT</h1>
        <div className={styles.mint_section}>
          <div>
            <h2>Mint NFT and Get Access to:</h2>
            <li>Whitelisting</li>
            <li>NFT Marketplace</li>
            <li>Battles</li>
            <li>Token</li>
            <li>And more future perks</li>
            {/* <button className={styles.redirect_button}> */}
              <MintNFT />
            {/* </button> */}
          </div>
          <div className={styles.nft}>
            <Image className={styles.nft} src={nft} />
          </div>
        </div>
      </div>

      <div className={styles.roadmap_section}>
        <h1>Roadmap</h1>
        <div className={styles.timeline}>
          <div className={`${styles.container} ${styles.left}`}>
            <div className={styles.content}>
              {/* <h2>1</h2> */}
              <p>Whitelisting</p>
            </div>
          </div>
          <div className={`${styles.container} ${styles.right}`}>
            <div className={styles.content}>
              {/* <h2>2</h2> */}
              <p>DAO NFT Launch</p>
            </div>
          </div>
          <div className={`${styles.container} ${styles.left}`}>
            <div className={styles.content}>
              {/* <h2>3</h2> */}
              <p>Match Prediction</p>
            </div>
          </div>
          <div className={`${styles.container} ${styles.right}`}>
            <div className={styles.content}>
              {/* <h2>4</h2> */}
              <p>Token Launch</p>
            </div>
          </div>
          <div className={`${styles.container} ${styles.left}`}>
            <div className={styles.content}>
              {/* <h2>5</h2> */}
              <p>NFT Utility Game</p>
            </div>
          </div>
          <div className={`${styles.container} ${styles.right}`}>
            <div className={styles.content}>
              {/* <h2>6</h2> */}
              <p>Match Tickets</p>
            </div>
          </div>
          <div className={`${styles.container} ${styles.left}`}>
            <div className={styles.content}>
              {/* <h2>7</h2> */}
              <p>User Onboarding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
