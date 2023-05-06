const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // URL from where we can extract the metadata for a LW3Punks
  const metadataURL =
    "ipfs://bafybeifwd7al3zxal5uridrzafgtuc542pbb64sg3epxlrnzyw3dbtil44/metadata";

  // Address of the whitelist contract that you deployed in the previous module
  const DaoContract = "0x21bc7ed40e09528c1FD6c9D3bdb8AEf61BCAb5Dd";

  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so lw3PunksContract here is a factory for instances of our LW3Punks contract.
  */
  const CricDAONFT = await ethers.getContractFactory("CricNFT");

  // deploy the contract
  const deployedCricDAONFTContract = await CricDAONFT.deploy(
    metadataURL,
    DaoContract
  );

  await deployedCricDAONFTContract.deployed();

  // print the address of the deployed contract
  console.log(
    "CricDAONFT Contract Address:",
    deployedCricDAONFTContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
