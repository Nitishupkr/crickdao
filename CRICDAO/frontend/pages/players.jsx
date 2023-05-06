import React, { useState, useEffect } from "react";
import PlayerCard from "../src/components/PlayerCard";
import styles from "../styles/Players.module.css";
import { fetchNFTs } from "../src/components/fetchNFTs";
import { player } from "../src/data/players";

/// we have to render all the NFTs in our collection
//. we will update this to only those NFTs which are purchased
// NFT market place contract is to be created that manages all the features of this
export default function players() {
  const [NFTs, setNFTs] = useState([]);

  const RenderNFTs = () => {};

  // useEffect(async () => {
  //   const nfts = await fetchNFTs();
  //   setNFTs(nfts);
  // });

  return (
    <div className={styles.container}>
      <h1>Player NFTs</h1>
      <div className={styles.main}>
        {player.map((data) => {
          return (
            <>
              <PlayerCard
                name={data.name}
                number={data.No}
                image={data.image}
                position={data.position}
                description={data.description}
                rating={data.rating}
                id={data.id}
              />
            </>
          );
        })}
        {/* <PlayerCard /> */}
      </div>
    </div>
  );
}
