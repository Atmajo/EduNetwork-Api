import "./config/module-alias";

import express, { Express } from "express";
import { indexRouter } from "@/routers";
import { config } from "@/config/config";
import logger from "@/logger/logger";
import schedulePing from "@/lib/cron";
import cors from "cors";
const session = require("express-session");
import { RedisStore } from "connect-redis";
import { redis } from "./lib/redis";

const redisStore = new RedisStore({
  client: redis,
  prefix: "edunetworkSession:",
});

const app: Express = express();
const port = config.port;

app.set("trust proxy", true);
app.use(
  cors({
    credentials: true,
    origin: config.frontend_url,
  })
);
app.use(
  session({
    name: "ambassador.sid",
    store: redisStore,
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,

    cookie: {
      // domain: "<your-domain>",
      path: "/",
      httpOnly: true,
      secure: config.nodeenv === "dev" ? true : false,
      sameSite: config.nodeenv === "dev" ? "none" : "lax",
      priority: "high",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(port, async () => {
  config.nodeenv === "production" && (await schedulePing.start());
  logger.info(`Server is running at http://localhost:${port}`);
});
