import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  CricDAOOWN_CONTRACT_ADDRESS,
  CricDAOOWN_ABI,
} from "../../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { ethers, utils } from "ethers";

/// Mints the NFT to get entry in the DAO easily for the User from the DAO OWN contract
const MintNFT = () => {
  const { address, isConnected } = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [daoUser, setDaoUser] = useState(false);
  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: CricDAOOWN_CONTRACT_ADDRESS,
    contractInterface: CricDAOOWN_ABI,
    signerOrProvider: signer || provider,
  });

  // const checkConnection = async () => {
  //   const { isConnected } = useAccount();
  //   await setWalletConnected(isConnected);
  // };

  const checkDaoUser = async () => {
    try {
      console.log("Checking if DAO user ...");
      const check = await contract.balanceOf(address, 0);
      console.log(parseInt(check._hex));
      const value = parseInt(check._hex);
      if (value) {
        console.log("Dao user");
        setDaoUser(true);
      } else {
        setDaoUser(false);
        console.log("Not a DAO user");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const mintNFT = async () => {
    try {
      console.log("Minting the NFT ..");
      setLoading(true);
      const mint = await contract.mint({ value: utils.parseEther("0.01") });
      await mint.wait();
      console.log("NFT minted");
      console.log("The transaction hash is : ", mint.hash);
      setLoading(false);
      await checkDaoUser();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      setLoading(true);
      checkDaoUser();
      setWalletConnected(true);
      setLoading(false);
    } else {
      setWalletConnected(false);
    }
  }, [isConnected]);

  const renderButton = () => {
    if (walletConnected) {
      if (daoUser) {
        return (
          <div className={styles.whitelist_btn}>
            Thanks for joining the DAO !
          </div>
        );
      } else if (loading) {
        return <button className={styles.whitelist_btn}>Loading...</button>;
      } else {
        return (
          <>
            <button onClick={mintNFT} className={styles.redirect_button}>
              Mint NFT
            </button>
          </>
        );
      }
    } else {
      return (
        // <button className={styles.whitelist_btn}>
        <ConnectButton />
        //  </button>
      );
    }
  };

  return <div>{renderButton()}</div>;
};

export default MintNFT;
