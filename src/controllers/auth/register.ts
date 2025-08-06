import logger from "@/logger/logger";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    logger.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
