import React, { useEffect, useState } from "react";
import { useContract, useSigner, useProvider, useAccount } from "wagmi";
import {
  CricDAONFT_CONTRACT_ADDRESS,
  CricDAONFT_ABI,
  MatchCreator_CONTRACT_ADDRESS,
  Match_ABI,
  OwnerAddress,
} from "../../constants/constants";

/// start the sale of NFTs
/// add matches
/// end matches
export default function Owner() {
  const { data: signer } = useSigner();
  const provider = useProvider();
  const { address } = useAccount();

  const [isOwner, setIsOwner] = useState(false);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [matchId, setMatchId] = useState();

  const NFTcontract = useContract({
    addressOrName: CricDAONFT_CONTRACT_ADDRESS,
    contractInterface: CricDAONFT_ABI,
    signerOrProvider: signer || provider,
  });

  const Matchcontract = useContract({
    addressOrName: MatchCreator_CONTRACT_ADDRESS,
    contractInterface: Match_ABI,
    signerOrProvider: signer || provider,
  });

  const startSale = async () => {
    try {
      console.log("starting the NFT sale");
      const tx = await NFTcontract.startPresale();
      await tx.wait();
      console.log("sale started");
    } catch (error) {
      console.log(error);
    }
  };

  const pauseSale = async () => {
    try {
      console.log("Pausing the NFT sale");
      const tx = await NFTcontract.setPaused(true);
      await tx.wait();
      console.log("sale Paused");
    } catch (error) {
      console.log(error);
    }
  };

  const addGame = async () => {
    try {
      console.log("Adding Match...");
      const tx = await Matchcontract.createMatch(team1, team2);
      await tx.wait();
      console.log("MatchId");
      console.log(parseInt(tx.value._hex));
      console.log("Match Added");
    } catch (error) {
      console.log(error);
    }
  };

  const endGame = async (winner) => {
    try {
      if (winner == 1 || winner == 2) {
        console.log("Ending the game.... ");
        /// winner is either team 1 or team 2 so only 2 Ids are allowed
        const tx = await Matchcontract.changeResult(matchId, winner);
        await tx.wait();
        console.log("Match ended and prize distibuted");
      } else {
        console.log("The team seleceted is not valid");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsOwner(address == OwnerAddress);
  }, []);

  const render = () => {
    if (isOwner) {
      return (
        <div>
          <div>
            <button onClick={startSale}>Start NFT sale</button>
            <button onClick={pauseSale}>Pause</button>
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setTeam1(e.target.value)}
              placeholder="Enter Team1"
              value={team1}
            ></input>
            <input
              type="text"
              onChange={(e) => setTeam2(e.target.value)}
              placeholder="Enter Team2"
              value={team2}
            ></input>
            +<button onClick={addGame}>Add Match</button>
            <button onClick={endGame}>End Match</button>
          </div>
        </div>
      );
    }
  };

  return <div>{render()}</div>;
}
