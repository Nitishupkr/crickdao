import styles from "../styles/Account.module.css";
import Image from "next/image";
import pfp from "../src/assets/avatar.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { fetchNFTs } from "../src/components/fetchNFTs";
import Owner from "../src/components/Owner";

// account section show the Details of the User
// Also show all the NFT owner by them , Alchemy SDK or API used to fetch the NFTs to be shown
// For Matches , there will be a Match Contracts that , have record of each Matches
// Show their DAO entry Status , also from the NFT status or either the Token Gating Call
export default function account() {
  const [NFTs, setNFTs] = useState([]);
  const [isDAOUser, setIsDAOUser] = useState(false);
  const [toggleState, setToggleState] = useState(1);

  function toggleTab(index) {
    setToggleState(index);
    console.log(index);
  }

  const RenderNFTs = () => {};

  const RenderMatches = () => {};

  // useEffect(async () => {
  //   const nfts = await fetchNFTs();
  //   setNFTs(nfts);
  // });

  return (
    <div className={styles.container}>
      <Owner />
      {/* <h1>User Account</h1> */}
      <main className={styles.main}>
        <div className={styles.pfp}>
          <Image src={pfp} className={styles.pfp} />
        </div>

        <div className={styles.content}>
          <h1>
            <ConnectButton />
          </h1>
          <ul>
            {/* <li>Rewards Earned</li>
            <li>NFTs Owned</li>
            <li>Matches Played</li> */}
          </ul>
          <p></p>
        </div>
      </main>
      <div className={styles.stats_heading}>
        <h1>User Stats</h1>
      </div>
      {/* stats section */}
      <div className={styles.stats_section}>
        <div className={styles.tabs_section}>
          <div
            onClick={() => toggleTab(1)}
            className={
              toggleState === 1
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
          >
            NFT Collection
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(2)}
          >
            Match History
          </div>
          {/* <div
            className={
              toggleState === 3
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(3)}
          >
            Tab3
          </div> */}
        </div>

        <div className={styles.content_tabs}>
          <div
            className={
              toggleState === 1
                ? `${styles.nft_stats} ${styles.active_content}`
                : styles.nft_stats
            }
          >
            <h1>Heading 1</h1>
            {/* <hr /> */}
            <p>Hey there this is content of tab1</p>
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.match_stats} ${styles.active_content}`
                : styles.match_stats
            }
          >
            <h1>Heading 2</h1>
            {/* <hr /> */}
            <p>This is another tab with differnt content</p>
          </div>

          {/* <div
            className={
              toggleState === 3
                ? `${styles.match_stats} ${styles.active_content}`
                : styles.match_stats
            }
          >
            <h1>Heading 3</h1>
            <p>This is just temporary tab :D</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
