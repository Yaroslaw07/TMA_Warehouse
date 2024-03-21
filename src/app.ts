import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import { Database, Resource } from "@adminjs/prisma";
import { itemsResource } from "./resources/items.resource.js";
import { requestResource } from "./resources/requests.resource.js";
import { AccountResource } from "./resources/account.resource.js";
import { authenticate } from "./utils/auth.js";
import dotenv from "dotenv";
import { createFirstAccount } from "./utils/firstAccount.js";
import { itemGroupResource } from "./resources/items_group.resource.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

AdminJS.registerAdapter({ Database, Resource });

const start = async () => {
  const app = express();

  const admin = new AdminJS({
    resources: [
      itemsResource,
      itemGroupResource,
      AccountResource,
      requestResource,
    ],
    branding: {
      companyName: "Warehouse",
      withMadeWithLove: false,
      logo: false,
    },
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookiePassword: process.env.COOKIE_SECRET!,
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET!,
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  await createFirstAccount();
  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
