import { PrismaClient } from "@prisma/client";
import { getModelByName } from "@adminjs/prisma";

const prisma = new PrismaClient();

const requestResource = {
  resource: { model: getModelByName("request"), client: prisma },
  options: {
    navigation: null,
    properties: {
      id: {
        isVisible: { list: false, show: true, edit: false, filter: true },
      },
    },
  },
};

export { requestResource };
