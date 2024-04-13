const {ethers} = require("hardhat");

async function run() {
    const [owner, otherAccount] = await ethers.getSigners();
    const contractAddress = "0xD13367A6Ac907a0cE6fd0e02026758775ca0f318";

    // 获取已部署的合约实例
    console.log("waiting for get contract !");
    const contract = await ethers.getContractAt("Hephaestus", contractAddress);
    console.log("get contract success: ", contractAddress);

    const ownerAddress = owner.address;
    console.log("my address is: ", ownerAddress);

    await contract.singleMint(ownerAddress, 2, "https://ipfs.io/ipfs/QmTurrmRKDMWrNt5jKuAxczEJThqtotWcd5VYMVorRPtCo");

    const uri = await contract.tokenURI(2);
    console.log("token uri is: ", uri);
}

run().then();


// 0x0000000000000000000000000000000000000000
// 0x0eff64702a91C5799C3FfDB26d2E128f813cf4bB