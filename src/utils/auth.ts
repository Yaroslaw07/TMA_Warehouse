import bcrypt from "bcrypt";
import { db } from "../db.js";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatched = await bcrypt.compare(password, hashedPassword);
  return isMatched;
};

const authenticate = async (email: string, password: string) => {
  const account = await db.account.findFirst({
    where: {
      email,
    },
  });

  if (!account) {
    return false;
  }

  const isMatched = await comparePassword(password, account.password);

  if (!isMatched) {
    return false;
  }

  return account;
};

export { authenticate, hashPassword, comparePassword };
