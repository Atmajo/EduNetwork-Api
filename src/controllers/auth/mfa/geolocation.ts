import { Request, Response } from "express";
import { getClientIp } from "request-ip";

const highRiskCountries = ["US", "CA", "GB", "AU", "IN", "-"];

export const geolocation = async (req: Request, res: Response) => {
  try {
    const ip = getClientIp(req);

    if (!ip) {
      return res.status(400).send("IP address not found.");
    }

    const ipLocation = await fetch(`https://api.iplocation.net/?ip=${ip}`).then(
      (response) => response.json()
    );

    console.log(ipLocation);

    if (!ipLocation) {
      return res.status(400).send("Unable to retrieve IP location.");
    }

    if (highRiskCountries.includes(ipLocation.country_code2)) {
      return res.status(200).json({ risk: true });
    }

    res.status(200).json({ risk: false });
  } catch (error) {
    console.log("Error in geolocation:", error);
    res.status(500).send("Internal Server Error");
  }
};
