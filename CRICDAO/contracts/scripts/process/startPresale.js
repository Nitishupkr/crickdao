const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  // deploy the contract
  const CricDAONFTContractAddress =
    "0x3409A47cEfa29dA695Dd06B8B94595C9eE519b5E";
  console.log("Starting the PreSale Mint...");
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
