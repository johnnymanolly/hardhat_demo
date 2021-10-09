let UserModel = require('../models/UserModel');
var sha256 = require('js-sha256');
const logger = require('../lib/Logger').init();

const Web3 = require('web3');
const PriceETHContract = require('../../build/contracts/Price_ETH.json');


class ContratcsService 
{
    
    constructor() {}

    async getETHPrice() 
    {
        logger.info('Getting ETH price..');

        // connect to rinkeby test blockchain
        const web3 = new Web3('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161');

        const contract = new web3.eth.Contract(
            PriceETHContract.abi,
            '0xfAc01B7458e81D80c28c89846C10363AbE7a87FB'
        );

        const result = await contract.methods.getThePrice().call();
        logger.info("eth price");
        logger.info(result/10**8);
        return result/10**8;
        

    }

}


module.exports = new ContratcsService;