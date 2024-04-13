const {ethers} = require("hardhat");

async function deploy() {
    const Contract = await ethers.getContractFactory("Proteus");
    const contract = await Contract.deploy("Proteus", "XPA", 1000);

    console.log("waiting for deployment");
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    console.log("deploy contract success, address: " + address);

    const [owner, user] = await ethers.getSigners();
    const balance = await contract.balanceOf(owner);
    console.log("owner balance:" + balance);
}

deploy().then();

//   const contract = await Contract.deploy("Proteus", "XPA", 1000);
//      waiting for deployment
//      deploy contract success, address: 0x7F25A4bbc48701a6D19a2c659bB25e9AE27b2167
//      owner balance:1000000000000000000000
