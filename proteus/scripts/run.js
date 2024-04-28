const {ethers} = require("hardhat");

async function run() {
    const [owner, user] = await ethers.getSigners();
    const contractAddress = "0x7F25A4bbc48701a6D19a2c659bB25e9AE27b2167";
    const contractName = "Proteus";

    // 获取已部署的合约实例
    console.log(`waiting for get contract ${contractName} contractAddress ${contractAddress}`);
    const contract = await ethers.getContractAt(contractName, contractAddress);
    console.log(`get contract success: ${contractAddress}`);
}

run().then();


//   const contract = await Contract.deploy("Proteus", "XPA", 1000);
//      waiting for deployment
//      deploy contract success, address: 0x7F25A4bbc48701a6D19a2c659bB25e9AE27b2167
//      owner balance:1000000000000000000000