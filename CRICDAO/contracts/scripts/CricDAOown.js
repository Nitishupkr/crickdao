const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // // URL from where we can extract the metadata for a LW3Punks
  const metadataURL =
    "ipfs://bafkreiel4y5jys2jtyagt4fru4db2sauedgzkrpdukjm4rppxyxvjckvzi";

  // Address of the whitelist contract that you deployed in the previous module
  const whitelistContract = "0xa0Bf9Eab5fbbA57F3EAe2e8eEfBF053C6627e151";

  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  const CricDAOown = await ethers.getContractFactory("CricDAOown");

  // deploy the contract
  const deployedCricDAOownContract = await CricDAOown.deploy(
    metadataURL,
    whitelistContract
  );

  await deployedCricDAOownContract.deployed();

  // print the address of the deployed contract
  console.log(
    "CricDAOown Contract Address:",
    deployedCricDAOownContract.address
  );

  // const tx = await deployedCricDAOownContract.setURI(metadataURL);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
