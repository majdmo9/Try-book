import { NextFunction, Request, Response } from "express";
import admin from "../database/firebase";
class MiddleWare {
  async decodeToken(req: any, res: Response, next: NextFunction) {
    const token: string | undefined =
      req?.headers?.authorization?.split(" ")[1];

    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;

        return next();
      }
      return res.json({ message: "Un Authorized" });
    } catch (err: any) {
      return res.json({ message: "Internal error!" });
    }
  }
}
export default new MiddleWare();
