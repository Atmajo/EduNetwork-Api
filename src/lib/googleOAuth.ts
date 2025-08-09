import { config } from "@/config/config";
import { google } from "googleapis";
import crypto from "crypto";

export const oauth2Client = new google.auth.OAuth2(
  config.google_client_id,
  config.google_client_secret,
  config.google_redirect_url
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/user.phonenumbers.read"
];

const state = crypto.randomBytes(32).toString("hex");

export const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
  state: state,
});

export const getToken = async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    return tokens;
  } catch (error) {
    throw error;
  }
};
