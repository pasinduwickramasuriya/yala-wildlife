// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "your-secret-key";

// export function signToken(payload: { id: string; role: string }) {
//   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
// }

// export function verifyToken(token: string) {
//   return jwt.verify(token, SECRET) as { id: string; role: string };
// }


// import jwt from "jsonwebtoken";

// const SECRET = process.env.JWT_SECRET || "your-secret-key";

// export function signToken(payload: { id: string; role: string }) {
//   return jwt.sign(payload, SECRET, { expiresIn: "1h" });
// }

// export function verifyToken(token: string) {
//   try {
//     return jwt.verify(token, SECRET) as { id: string; role: string };
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return { role: "unauthorized" };
//   }
// }

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your-secret-key"; // Set in .env

export interface TokenPayload {
  id: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, SECRET);
    // Ensure decoded is an object with id and role
    if (typeof decoded === "object" && decoded !== null && "id" in decoded && "role" in decoded) {
      return decoded as TokenPayload;
    }
    throw new Error("Invalid token payload");
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}