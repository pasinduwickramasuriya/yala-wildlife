import "@prisma/client";

declare module "@prisma/client" {
  export interface PrismaClient {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogReaction: any;
  }
}
