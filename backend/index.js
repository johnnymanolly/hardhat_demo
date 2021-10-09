require('custom-env').env();

const express    = require('express');
const bodyParser = require('body-parser');
const routes     = require('./routes/routes');
const logger = require('./lib/Logger').init();

const hostname   = process.env.HOST;
const port       = process.env.PORT;

const app = express();
app.use(bodyParser.json({ limit: '50MB' }));
app.use('/', routes);


process.on('uncaughtException', function (err) {
	logger.error('Unexpected error');
    logger.error(err);
}); 

app.listen(port, hostname, () => 
{
    logger.info(`Up and running!! - contracts interaction service - Server running at http://${hostname}:${port}/`);
});