const {ethers} = require("hardhat");

async function deploy() {
    const Contract = await ethers.getContractFactory("Hephaestus");
    const contract = await Contract.deploy("Hephaestus", "Hephaestus");

    console.log("waiting for deployment");
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    console.log("deploy contract success, address: " + address);
}

deploy().then();