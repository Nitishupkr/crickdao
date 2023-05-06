import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  CricDAOOWN_CONTRACT_ADDRESS,
  CricDAOOWN_ABI,
} from "../../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { ethers, utils } from "ethers";

const TokenGating = async () => {
  const [isDAOUser, setIsDAOUser] = useState(false);

  const { address } = useAccount();
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: CricDAOOWN_CONTRACT_ADDRESS,
    contractInterface: CricDAOOWN_ABI,
    signerOrProvider: signer || provider,
  });
  const checkUser = async () => {
    /// will just call balanceOf view function from the contract so as the DAO user is allowed to move ahead
    /// They must own the NFT with tokenID 0 > 1
    if (contract.balanceOf(address, 0) > 0) {
      setIsDAOUser(true);
    }
  };

  //we will call the TokenGating Every time on every page load and which returns bool
  return isDAOUser;
};
