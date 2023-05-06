import { providers, Contract } from "ethers";
import { useEffect, useRef, useState } from "react";
import {
  CricDAOWhitelist_CONTRACT_ADDRESS,
  CricDAOWhitelist_ABI,
} from "../constants/constants";
import styles from "../styles/Home.module.css";
import React from "react";
// import Web3Modal from "web3modal";
import {
  useContract,
  useSigner,
  useProvider,
  useAccount,
  useConnect,
} from "wagmi";

const Whitelist = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [loading, setLoading] = useState(false);

  const { isConnected, isDisconnected } = useAccount();

  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: CricDAOWhitelist_CONTRACT_ADDRESS,
    contractInterface: CricDAOWhitelist_ABI,
    signerOrProvider: signer || provider,
  });

  const addAddressToWhitelist = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction
      // call the addAddressToWhitelist from the contract
      const tx = await contract.addAddressToWhitelist();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get the updated number of addresses in the whitelist
      await getNumberOfWhitelisted();
      setJoinedWhitelist(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getNumberOfWhitelisted = async () => {
    try {
      // call the numAddressesWhitelisted from the contract
      const _numberOfWhitelisted = await contract.numAddressesWhitelisted();
      setNumberOfWhitelisted(_numberOfWhitelisted);
    } catch (err) {
      console.error(err);
    }
  };

  const checkIfAddressInWhitelist = async () => {
    try {
      // call the whitelistedAddresses from the contract
      const _joinedWhitelist = await contract.whitelistedAddresses(signer);
      setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  const ConnectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      const connect = useConnect({
        chainId: 80001,
      });
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!isConnected) {
      ConnectWallet();
      setWalletConnected(true);
      console.log(signer);
      checkIfAddressInWhitelist();
    } else {
      setWalletConnected(true);
    }
  }, [walletConnected]);

  const renderButton = () => {
    if (isConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return <button className={styles.button2}>Loading...</button>;
      } else {
        return (
          <>
            <button onClick={addAddressToWhitelist} className={styles.whitelist_btn}>
              Join Whitelist
            </button>
          </>
        );
      }
    } else {
      return <button className={styles.button2}>Connect your wallet</button>;
    }
  };

  return <div>{renderButton()}</div>;
};

export default Whitelist;
