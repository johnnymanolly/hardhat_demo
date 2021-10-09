const winston = require('winston');

const { format } = require('winston');
const { combine, timestamp, label, printf } = format;
 
class Logger 
{
    constructor() {}

    init() 
    {

    	const myFormat = printf(({ level, message, label, timestamp }) => 
    	{
    	  if(typeof message == 'object')
    	  {
    	  	message = JSON.stringify(message);
    	  }
		  return `${timestamp} [${label}] ${level}: ${message}`;
		});

        const logger = winston.createLogger({
        	level: 'info',
        	format: combine
        	(
			    label({ label: '' }),
			    timestamp(),
			    myFormat
			),
		//  defaultMeta: { service: 'user-service' },
		  transports: [
		    new winston.transports.File({ filename: './logs/debug.log', level: 'error' }),
		    new winston.transports.File({ filename: './logs/debug.log' })
		  ]
		});
		 
		//
		// If we're not in production then log to the `console` with the format:
		// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
		// 
		if (process.env.NODE_ENV !== 'production') 
		{
		  logger.add(new winston.transports.Console({format: winston.format.simple()}));
		}

		return logger;
    }
}

module.exports = new Logger();