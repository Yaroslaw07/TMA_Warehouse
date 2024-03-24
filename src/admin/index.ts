import { Database, Resource } from "@adminjs/prisma";
import AdminJS from "adminjs";
import { itemsResource } from "./resources/items.resource.js";
import { itemGroupResource } from "./resources/items_group.resource.js";
import { AccountResource } from "./resources/account.resource.js";
import { requestResource } from "./resources/requests.resource.js";
import { componentLoader } from "./componentLoader.js";
import { locale } from "./locale/index.js";

AdminJS.registerAdapter({ Database, Resource });

const admin = new AdminJS({
  componentLoader,
  resources: [
    itemsResource,
    itemGroupResource,
    AccountResource,
    requestResource,
  ],

  locale,
  branding: {
    companyName: "Warehouse",
    withMadeWithLove: false,
    logo: false,
  },
});

export { admin };
