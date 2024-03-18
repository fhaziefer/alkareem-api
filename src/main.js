import { web } from "./application/web.js";
import { logger } from "./application/logging.js"

const PORT = process.env.PORT || 300

web.listen(PORT, () => {
    logger.info(`App start in Port: ${PORT}`)
})