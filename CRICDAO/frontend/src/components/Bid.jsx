/// allows the user to bid on a particular match
/// shows 2 buttons for each MatchID
import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { Game_CONTRACT_ADDRESS, Game_ABI } from "../../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { ethers, utils } from "ethers";

/// setting this bid button wherever we want and in a match we want
export default function Bid(props) {
  // match created according to the contract
  const [matchID, setMatchID] = useState(0);

  /// id can only be 1 or  2
  //   const [teamId, setTeamId] = useState(0);

  // signer , provider , contract
  const { data: signer } = useSigner();
  const provider = useProvider();
  const contract = useContract({
    addressOrName: Game_CONTRACT_ADDRESS,
    contractInterface: Game_ABI,
    signerOrProvider: signer || provider,
  });

  const PlaceBid = async (teamId) => {
    try {
      console.log("bidding...");
      const tx = await contract.bid(matchID, teamId, {
        value: ethers.utils.parseEther("0.05"),
      });
      console.log("bid placed");
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className={styles.play_btn}
        onClick={() => {
          PlaceBid(1);
        }}
      >
        {" "}
        Team1{" "}
      </button>
      <button
        className={styles.play_btn}
        onClick={() => {
          PlaceBid(2);
        }}
      >
        {" "}
        Team 2
      </button>
    </div>
  );
}
