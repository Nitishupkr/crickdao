const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // Address of the Crypto Devs NFT contract that you deployed in the previous module
  const CricDAONFTContract = "0x4dED7b100c10Bd71Aae9c7AE8E9aa260304bEA04";
  /*
    A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
    so cryptoDevsTokenContract here is a factory for instances of our CryptoDevToken contract.
    */
  const CricoContract = await ethers.getContractFactory(
    "Crico"
  );

  // deploy the contract
  const deployedCricoContract = await CricoContract.deploy(
    CricDAONFTContract
  );

  // print the address of the deployed contract
  console.log(
    "Crico Token Contract Address:",
    deployedCricoContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });