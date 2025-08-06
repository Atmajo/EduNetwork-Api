import { config } from "@/config/config";
import { CosmosClient } from "@azure/cosmos";

export const client = new CosmosClient({
  endpoint: config.dburl,
  key: config.dbkey,
});
