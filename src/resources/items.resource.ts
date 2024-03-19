import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";

const prisma = new PrismaClient();

const itemsResource = {
  resource: { model: getModelByName("item"), client: prisma },
  options: {
    navigation: null,
  },
};

export default itemsResource;
