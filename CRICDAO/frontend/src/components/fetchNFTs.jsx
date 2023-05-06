// alchemy-nft-api/axios-script.js
import axios from "axios";

/// fetchs all the NFT for the collection
const FetchNFTs = async (userAddress) => {
  // Replace with your Alchemy API key:
  const apiKey = "bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u";
  const baseURL = `https://polygon-mumbai.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`;
  // Replace with the wallet address you want to query for NFTs:
  const ownerAddr = userAddress;
  const contractAddress = "0x3409A47cEfa29dA695Dd06B8B94595C9eE519b5E";
  const withMetadata = "true";

  const url = `${baseURL}?contractAddress=${contractAddress}&withMetadata=${withMetadata}`;
  const config = {
    method: "get",
    url: url,
  };

  // Make the request and print the formatted response:
  const data = axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.data, null, 2));
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
};
