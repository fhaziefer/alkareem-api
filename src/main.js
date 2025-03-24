import { web } from "./application/web.js";
import { logger } from "./application/logging.js";
import "./application/logGenerator.js"; // Add this line

const PORT = process.env.PORT || 3111;

web.listen(PORT, () => {
    logger.info(`App started on port ${PORT}`);
    logger.info("Log viewer available at /logs");
});