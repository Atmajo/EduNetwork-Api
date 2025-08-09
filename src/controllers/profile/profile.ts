import { config } from "@/config/config";
import { oauth2Client } from "@/lib/googleOAuth";
import { Request, Response } from "express";
import { google } from "googleapis";

export const profile = async (req: Request, res: Response) => {
  if (!req.session.tokens) {
    return res.status(401).send("Unauthorized: No session tokens found.");
  }

  try {
    oauth2Client.setCredentials(req.session.tokens);

    const peopleService = google.people({ version: "v1", auth: oauth2Client });
    const people = await peopleService.people.get({
      resourceName: "people/me",
      personFields: "names,emailAddresses,photos,phoneNumbers",
    }).then((data) => {
      return {
        name: data.data.names ? data.data.names[0].displayName : "No Name",
        email: data.data.emailAddresses ? data.data.emailAddresses[0].value : "No Email",
        picture: data.data.photos ? data.data.photos[0].url : "No Picture",
        phone: data.data.phoneNumbers ? data.data.phoneNumbers[0].value : "No Phone",
      };
    });

    res.status(200).json(people);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send("Failed to fetch profile.");
  }
};
