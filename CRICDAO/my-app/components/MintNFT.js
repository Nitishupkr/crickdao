import React from "react";
import styles from "./MintNFT.module.css";
import styles2 from "./Home.module.css";
import gif from "../public/cricDAO.gif";
import Image from "next/image";
import { utils } from "ethers";
import { useContract, useSigner, useProvider } from "wagmi";
import {
  CricDAOOWN_CONTRACT_ADDRESS,
  CricDAOOWN_ABI,
} from "../constants/constants";
export default function MintNFT() {
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: CricDAOOWN_CONTRACT_ADDRESS,
    contractInterface: CricDAOOWN_ABI,
    signerOrProvider: signer || provider,
  });

  const mintNFT = async () => {
    try {
      console.log("Minting the NFT ..");
      const mint = await contract.mint({ value: utils.parseEther("0.01") });
      await mint.wait();
      console.log("NFT minted");
      console.log("The transaction hash is : ", mint.hash);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.box}>
        <div className={styles.gif}>
          <Image src={gif} />
        </div>
        <div className={styles.content}>
          <div className={styles.center}>
            <h1>
              Mint NFT and <br /> Get Access to:
            </h1>
            <ul>
              <li>Whitelisting</li>
              <li>NFT marketplace</li>
              <li>Token</li>
              <li>Match prediction</li>
            </ul>
            <button onClick={mintNFT} className={styles2.redirect_button}>
              Mint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
