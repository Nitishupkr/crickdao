import React, { useState } from "react";
// import { currentAccount } from "../components/ConnectWallet";
import styles from "../styles/Account.module.css";
// import { useMoralisWeb3Api } from "react-moralis";
import Card from "../components/Card";
import { ethers } from "ethers";

const account = () => {
  // const contract_address = "";
  // // const Web3Api = useMoralisWeb3Api();
  // // const [NFTs,setNFTs] = useState("");
  // // const [counter,setCounter] = useState(0) ;
  // const price = 0.01;

  // const fetchNFTsForContract = async () => {
  //   const options = {
  //     chain: "mumbai",
  //     address: {currentAccount},
  //     token_address: {contract_address},
  //   };
  //   const fetchedNFTs = await Web3Api.account.getNFTsForContract(options);
  //   setNFTs(fetchedNFTs) ;
  // };
  return (
    <div>
      {/* card section */}
      {/* <div className={styles.card}>
        <div className={styles.cardmain}>
          <img src="/avatar.png" className={styles.cardimg} />
          <div className={styles.account}>Account:{currentAccount}</div>
          <div className={styles.account}>Balance: {}</div>
          <div className={styles.account}>NFT Players Owned: {counter}</div>
        </div>
      </div> */}

      {/* NFTs Section
      <div className={styles.nfts} >
      {
                    NFTs ? NFTs.map(NFT => {
                        
                        return (          
                           <Card key={NFT.value.name} image={NFT.value.image} position={NFT.value.position} price={price} description={NFT.value.description} address={NFT.value.contractAddress}></Card>
                           
                        )
                    }) : <div className='text-white'>No NFTs found</div>
                }
      </div> */}
    </div>
  );
};

export default account;
