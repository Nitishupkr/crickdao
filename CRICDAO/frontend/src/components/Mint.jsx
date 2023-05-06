import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  CricDAONFT_CONTRACT_ADDRESS,
  CricDAONFT_ABI,
  OwnerAddress,
} from "../../constants/constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Home.module.css";
import { ethers, utils } from "ethers";

/// Mint an NFT with _id from the NFT collection contract , which user calls
/// Also controls Sale of NFT
export default function Mint(props) {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const { address } = useAccount();
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const contract = useContract({
    addressOrName: CricDAONFT_CONTRACT_ADDRESS,
    contractInterface: CricDAONFT_ABI,
    signerOrProvider: signer || provider,
  });

  const mintNFT = async (id) => {
    try {
      console.log(id);
      console.log("Minting the NFT for you ...");

      /// there are 2 conditions to check whether the presale is running or not , so according to the boolean the Minting will be processed
      if (contract.presaleStarted) {
        console.log("Congrats you are in Presale Minting");
        const price = ethers.utils.parseEther("0.05");
        const tx = await contract.presaleMint(id, { value: price });
        await tx.wait();
        console.log("Presale NFT minted for you");
      } else {
        const price = ethers.utils.parseEther("0.07");
        const tx = await contract.presaleMint(id, { value: price });
        await tx.wait();
        console.log("NFT minted for you");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsOwner(address == OwnerAddress);
  }, []);

  ///to start the sale , will be only shown if the user is owner and can only be called by them
  const startSale = async () => {
    try {
      console.log("Checking the User ..");
      if (isOwner) {
        console.log("Starting the PreSale ...");
        const tx = await contract.startPresale();
        await tx.wait();
        console.log("PreSale Started");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className={styles.play_btn}
        onClick={() => {
          mintNFT(props._id);
        }}
      >
        Mint NFT
      </button>
    </div>
  );
}
