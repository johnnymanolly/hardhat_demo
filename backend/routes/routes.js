const express = require('express');
const contartsCrtl = require('../controller/ContractsController');

const router = express.Router();


router.get('/api/getETHPrice',  contartsCrtl.getETHPrice);

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;