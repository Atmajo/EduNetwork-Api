import { config } from "@/config/config";
import { getToken } from "@/lib/googleOAuth";
import { Request, Response } from "express";
import { getClientIp } from "request-ip";
import { v4 as uuidv4 } from "uuid";

declare module "express-session" {
  interface SessionData {
    tokens?: any;
  }
}

export const googleOAuthCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Authorization code not found.");
  }

  try {
    const tokens = await getToken(code as string);
    
    req.session.tokens = tokens;

    res.redirect("/profile");
  } catch (error) {
    console.error("Error getting tokens:", error);
    res.status(500).send("Authentication failed.");
  }
};
