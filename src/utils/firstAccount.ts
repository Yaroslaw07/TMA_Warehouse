import { hashPassword } from "./auth.js";
import { db } from "../db.js";
import bcrypt from "bcrypt";

const createFirstAccount = async () => {
  const email = process.env.FIRST_ACCOUNT_EMAIL;
  const password = process.env.FIRST_ACCOUNT_PASSWORD;

  if (!email || !password) {
    console.error("No first user email or password provided");
    return;
  }

  const account = await db.account.findFirst({
    where: {
      email,
    },
  });

  if (account) {
    console.log("First user already exists");
    return;
  }

  const hashedPassword = await hashPassword(password);

  await db.account.create({
    data: {
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("First user created");
};

export { createFirstAccount };
