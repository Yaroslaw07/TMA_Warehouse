import AdminJSExpress from "@adminjs/express";
import express from "express";
import { authenticate } from "./utils/auth.js";
import dotenv from "dotenv";
import { createFirstAccount } from "./utils/firstAccount.js";
import { admin } from "./admin/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const start = async () => {
  const app = express();

  admin.watch();
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
