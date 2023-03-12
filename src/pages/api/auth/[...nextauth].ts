import NextAuth from "next-auth";
import { authOptions } from "@codekit/studio/server/auth";

export default NextAuth(authOptions);
