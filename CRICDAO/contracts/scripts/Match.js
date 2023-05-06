const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const MatchContract = await ethers.getContractFactory("MatchCreator");

  // deploy the contract
  const deployedMatchContract = await MatchContract.deploy();

  // print the address of the deployed contract
  console.log("Match Contract Address:", deployedMatchContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
