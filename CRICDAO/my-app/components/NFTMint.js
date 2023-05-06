import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import {CricDAOOWN_CONTRACT_ADDRESS,CricDAOOWN_ABI } from "../constants/constants";
import styles from "../styles/Home.module.css";

const NFTMint = () => {
    const [walletConnected, setWalletConnected] = useState(false);
    // loading is set to true when we are waiting for a transaction to get mined
    const [loading, setLoading] = useState(false);
    // tokenIdsMinted keeps track of the number of tokenIds that have been minted
    const [tokenIdsMinted, setTokenIdsMinted] = useState("0");
    // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
    const web3ModalRef = useRef()

    const Mint = async () => {
        try {
          console.log("Public mint");
          // We need a Signer here since this is a 'write' transaction.
          const signer = await getProviderOrSigner(true);
          // Create a new instance of the Contract with a Signer, which allows
          // update methods
          const nftContract = new Contract(CricDAOOWN_CONTRACT_ADDRESS,CricDAOOWN_ABI, signer);
          // call the mint from the contract to mint the LW3Punks
          const tx = await nftContract.mint({
            // value signifies the cost of one LW3Punks which is "0.01" eth.
            // We are parsing `0.01` string to ether using the utils library from ethers.js
            value: utils.parseEther("0.01"),
          });
          setLoading(true);
          // wait for the transaction to get mined
          await tx.wait();
          setLoading(false);
          window.alert("You successfully minted you DAONFT");
        } catch (err) {
          console.error(err);
        }
      };


      const connectWallet = async () => {
        try {
          // Get the provider from web3Modal, which in our case is MetaMask
          // When used for the first time, it prompts the user to connect their wallet
          await getProviderOrSigner();
          setWalletConnected(true);
        } catch (err) {
          console.error(err);
        }
      };


      const getProviderOrSigner = async (needSigner = false) => {
        // Connect to Metamask
        // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);

        // If user is not connected to the Mumbai network, let them know and throw an error
        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 80001) {
          window.alert("Change the network to Mumbai");
          throw new Error("Change network to Mumbai");
        }

        if (needSigner) {
          const signer = web3Provider.getSigner();
          return signer;
        }
        return web3Provider;
      };

      useEffect(() => {
        // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
        if (!walletConnected) {
          // Assign the Web3Modal class to the reference object by setting it's `current` value
          // The `current` value is persisted throughout as long as this page is open
          web3ModalRef.current = new Web3Modal({
            network: "mumbai",
            providerOptions: {},
            disableInjectedProvider: false,
          });

          connectWallet();

        //   getTokenIdsMinted();

        //   // set an interval to get the number of token Ids minted every 5 seconds
        //   setInterval(async function () {
        //     await getTokenIdsMinted();
        //   }, 5 * 1000);
        }
      }, [walletConnected]);


      const renderButton = () => {
        // If wallet is not connected, return a button which allows them to connect their wallet
        if (!walletConnected) {
          return (
            <button onClick={connectWallet} className={styles.button}>
              Connect your wallet
            </button>
          );
        }

        // If we are currently waiting for something, return a loading button
        if (loading) {
          return <button className={styles.button}>Loading...</button>;
        }

        return (
          <button className={styles.button} onClick={Mint}>
            Public Mint 🚀
          </button>
        );
      };




    return (
        <div>{renderButton()}</div>
    )
}

export default NFTMint

