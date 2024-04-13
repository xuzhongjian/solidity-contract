const {ethers} = require("hardhat");

let contract;

describe("Hephaestus test", function () {
    async function init() {
        const [owner, user] = await ethers.getSigners();
        const Contract = await ethers.getContractFactory("Hephaestus");
        contract = await Contract.deploy("Hephaestus", "Hephaestus");

        console.log("deploy contract success, address:" + contract.address);
    }

    before(async function () {
        await init();
    });

    it("init equal 0", async function () {
        const totalSupply0 = await contract.totalSupply();
        console.log("totalSupply0: ", totalSupply0);
        const strings = ["https://ipfs.io/ipfs/QmaYFWuMssxy8kdEjsfr9EmSqnf3zxyA6UfUuXrt4Mv5P4"];

        await contract.batchMint(["0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"], [1], strings);
        await contract.batchMint(["0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB"], [2], strings);
        const totalSupply2 = await contract.totalSupply();
        console.log("totalSupply2: ", totalSupply2);
        const uri = await contract.tokenURI(1);
        console.log("uri: ", uri);
    });
});
