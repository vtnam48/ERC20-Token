require('dotenv').config();
const { Web3 } = require('web3');
const floppyabi = require('../contracts/floppy.json');
const vaultabi = require('../contracts/vault.json');

class SmartContractDAO {
    constructor() {
        this.web3 = new Web3('https://ethereum-sepolia-rpc.publicnode.com');
        this.token_address = process.env.TOKEN_ADDRESS;
        this.vault_address = process.env.VAULT_ADDRESS;
        this.withdrawer_private_key = process.env.WITHDRAWER_PRIVATE_KEY;
        this.withdrawer_address = process.env.WITHDRAWER_ADDRESS;
    }

    async withdraw(address, amount) {
        this.web3.eth.accounts.wallet.add(`0x${this.withdrawer_private_key}`);

        const vault_contract = await new this.web3.eth.Contract(vaultabi, this.vault_address);

        let value = Web3.utils.toWei(amount.toString(), '');

        let rs = await vault_contract.methods
            .withdraw(value, address)
            .send({
                from: this.withdrawer_address,
                gas: 3000000,
            });

        console.log(rs);
        return rs.transactionHash;
    }
}

module.exports = SmartContractDAO;