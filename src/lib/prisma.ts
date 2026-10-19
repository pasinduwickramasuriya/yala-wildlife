import { PrismaClient } from "@prisma/client";

// Explicitly ensure models are known to TypeScript even if IDE has cached types
export type AppPrismaClient = PrismaClient & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    blogReaction: any;
};

const prismaClientSingleton = (): AppPrismaClient => {
    return new PrismaClient() as AppPrismaClient;
};

const globalForPrisma = globalThis as unknown as {
    prisma: AppPrismaClient | undefined;
};

const prisma: AppPrismaClient = (globalForPrisma.prisma ?? prismaClientSingleton()) as AppPrismaClient;

export default prisma;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}