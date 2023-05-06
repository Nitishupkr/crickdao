import BattleCard from "../src/components/BattleCard";
import styles from "../styles/Battle.module.css";
import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  MatchCreator_CONTRACT_ADDRESS,
  Match_ABI,
} from "../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Bid } from "../src/components/Bid";

export default function battle() {
  const [matches, setMatches] = useState([]);
  const provider = useProvider();

  const contract = useContract({
    addressOrName: MatchCreator_CONTRACT_ADDRESS,
    contractInterface: Match_ABI,
    signerOrProvider: provider,
  });

  const getMatch = async () => {
    console.log("Fetching All the match...");
    const data = await contract.getRecord();
    console.log(data);
    console.log("Matchs Fetched");
  };

  useEffect(() => {
    getMatch();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>Ongoing Battles</h1>
        <div className={styles.main}>
          <div className={styles.card}>
            <BattleCard />
          </div>
          <div className={styles.card}>
            <BattleCard />
          </div>
        </div>
      </div>
    </>
  );
}
