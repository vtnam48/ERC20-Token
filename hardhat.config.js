require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    testnet: {
      // url: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
      url: "https://sepolia.infura.io/v3/",

      // chainId: 97,
      chainId: 11155111,

      // gasPrice: 20000000000,

      // accounts: [`0x${process.env.PRIV_KEY}`]
      accounts: [process.env.PRIV_KEY]

    },
  }
};
