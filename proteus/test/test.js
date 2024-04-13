const {ethers} = require("hardhat");

let contract;

describe("Hephaestus test", function () {
    async function init() {

        const Contract = await ethers.getContractFactory("Proteus");
        contract = await Contract.deploy("Proteus-A", "XPA", 1000);

        console.log("deploy contract success, address:" + contract.address);
    }

    before(async function () {
        await init();
    });

    it("check owner balance", async function () {
        const [owner, user] = await ethers.getSigners();
        const balance = await contract.balanceOf(owner);
        console.log("owner balance:" + balance);
    });
});
