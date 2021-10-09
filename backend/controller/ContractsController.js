let contractsService = require('../services/ContratcsService');
let commonLib = require('../lib/commonLib');
const logger = require('../lib/Logger').init();

class ContractsController 
{
    constructor() {}

    getPrice(req, res) {

    }

    getETHPrice(req, res)
    {

        logger.info('Contracts Controller request:');
        logger.info(req.query);

        var requiredParams = [];
        var validation = commonLib.validateParamsNonEmpty(req.body, requiredParams);
        if(validation.status != "success")
        {
            logger.error('Invalid request data');
            logger.error(validation);
            return res.status(200).json(validation);
        }

        logger.info('calling service');
        contractsService.getETHPrice(req.body).then(response => 
        {
            return res.status(200).json(response); 
        })
        .catch(err => 
        {
            logger.error('Service failed to get ETH price');
            logger.error(err);
         //   throw err;
        })
    }




}

module.exports = new ContractsController;