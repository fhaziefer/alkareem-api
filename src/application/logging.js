import winston from 'winston';
import path from 'path';
import fs from 'fs';

const logDir = 'public/files';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, 'log.json');

// Initialize with empty file if doesn't exist
if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '');
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: logFilePath,
            format: winston.format.printf(info => {
                return JSON.stringify({
                    level: info.level,
                    message: info.message,
                    target: info.target,
                    timestamp: info.timestamp || new Date().toISOString(),
                    ...(typeof info.message === 'object' ? info.message : {})
                });
            })
        })
    ]
});

// Handle process exit to ensure logs are flushed
process.on('exit', () => {
    logger.end();
});