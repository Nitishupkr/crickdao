const { ethers } = require("hardhat");

async function main() {
  // Now deploy the CricDAO contract

  const CricDAOown_CONTRACT_ADDRESS = "0x65c36f49a2aCF970485C91d0FDEdA3C6DE50B254"
  const CricDAO = await ethers.getContractFactory("CricDAO");
  const cricDAO = await CricDAO.deploy(
    CricDAOown_CONTRACT_ADDRESS,
    {
      // This assumes your account has at least 1 ETH in it's account
      // Change this value as you want
      value: ethers.utils.parseEther("1"),
    }
  );
  await cricDAO.deployed();

  console.log("CricDAO deployed to: ", cricDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });