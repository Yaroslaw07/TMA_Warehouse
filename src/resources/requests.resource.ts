import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";
import { navigation } from "../navigation.js";

const prisma = new PrismaClient();

const requestResource = {
  resource: { model: getModelByName("request"), client: prisma },
  options: {
    navigation: navigation,
  },
};

export { requestResource };
