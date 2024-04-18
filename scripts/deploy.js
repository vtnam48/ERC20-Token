// const { ethers, hardhatArguments } = require('hardhat');
// const Config = require('./config');

async function main() {
    // await Config.initConfig();
    // const network = hardhatArguments.network ? hardhatArguments.network : 'dev';
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const Token = await ethers.getContractFactory("Floppy"); //Replace with name of your smart contract
    const token = await Token.deploy();


    console.log(`Token address: Floppy`, token.target);
    await token.deploymentTransaction().wait(2);

    const Vault = await ethers.getContractFactory("Vault"); //Replace with name of your smart contract
    const vault = await Vault.deploy();

    console.log(`Token address: Vault`, vault.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
