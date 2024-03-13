import { web } from "./application/web.js";
import { logger } from "./application/logging.js"

const PORT = 300

web.listen(PORT, () => {
    logger.info(`App start in Port: ${PORT}`)
})