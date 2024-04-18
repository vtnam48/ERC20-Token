require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    testnet: {
      url: "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      accounts: [process.env.PRIV_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
  // sourcify: {
  //   enabled: true
  // }
};
