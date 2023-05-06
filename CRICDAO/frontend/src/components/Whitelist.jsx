import { useEffect, useRef, useState } from "react";
import {
  CricDAOWhitelist_CONTRACT_ADDRESS,
  CricDAOWhitelist_ABI,
} from "../../constants/constants";
import styles from "../../styles/Home.module.css";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

/// Whitelist the Users to allow him to continue minting the NFT
const Whitelist = () => {
  const { address, isConnected } = useAccount();
  const [walletConnected, setWalletConnected] = useState(false);
  const [joinedWhitelist, setJoinedWhitelist] = useState(false);
  const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [loading, setLoading] = useState(false);

  const { data: signer } = useSigner();
  const provider = useProvider();

  const contract = useContract({
    addressOrName: CricDAOWhitelist_CONTRACT_ADDRESS,
    contractInterface: CricDAOWhitelist_ABI,
    signerOrProvider: signer || provider,
  });

  // const checkConnection = async () => {
  //   const { isConnected } = useAccount();
  //   await setWalletConnected(isConnected);
  // };

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
      const _joinedWhitelist = await contract.whitelistedAddresses(address);
      await setJoinedWhitelist(_joinedWhitelist);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isConnected) {
      checkIfAddressInWhitelist();
      setWalletConnected(true);
      console.log(address);
    } else {
      setWalletConnected(false);
    }
  }, [isConnected]);

  const renderButton = () => {
    if (walletConnected) {
      if (joinedWhitelist) {
        return (
          <div className={styles.description2}>
            Thanks for joining the Whitelist!
          </div>
        );
      } else if (loading) {
        return (
          <>
            <div className={styles.whitelist_btn}>Loading...</div>
          </>
        );
      } else {
        return (
          <>
            <button
              onClick={addAddressToWhitelist}
              className={styles.redirect_button}
            >
              Join Whitelist
            </button>
          </>
        );
      }
    } else {
      return (
        <>
          <div className={styles.redirect_button}>
            <ConnectButton />
          </div>
        </>
      );
    }
  };

  return (
    <div>
      {/* <button onClick={addAddressToWhitelist} className={styles.whitelist_btn}>
        Join Whitelist
      </button> */}
      {/* <a> No. of User Whitelisted : {numberOfWhitelisted} </a> */}
      {renderButton()}
    </div>
  );
};

export default Whitelist;
