import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

// Always ensure a fresh client when schema is updated
const prisma = new PrismaClient();

export default prisma;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}