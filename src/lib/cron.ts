import { schedule } from "node-cron";
import logger from "@/logger/logger";
import { config } from "@/config/config";

const schedulePing = schedule(config.cronjob, async () => {
  logger.info("Server ping cron job scheduled to run every 5 minutes");
  try {
    const response = await fetch(`${config.url}/ping`, {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error(`Ping failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Ping response data:", data.data);
  } catch (error) {
    logger.error("Cron job failed", {
      error: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
  }
});

export default schedulePing;
