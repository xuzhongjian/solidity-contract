require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.4",
    networks: {
        sepolia: {
            url: "https://rpc.sepolia.org",
            // accounts: {
            mnemonic: MNEMONIC,
            // },
            chainId: 11155111
        }
    },
    etherscan: {
        apiKey: {
            sepolia: "HP2Q9JWBG5RAUGH9MPKEEJUFCPUSFJ26U6"
        }
    },
    sourcify: {
        enabled: true,
        solcInput: false,
        runs: 200
    },
    timeout: 600000
};
