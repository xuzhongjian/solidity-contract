const { ethers } = require("hardhat");

async function main() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    console.log("waiting for deployment");
    await counter.waitForDeployment();
    const address = await counter.getAddress();
    console.log("Counter address:", address);
}

main();