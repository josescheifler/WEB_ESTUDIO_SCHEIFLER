import { PrismaClient } from "@prisma/client";

// Un único cliente para toda la app. Evita abrir una conexión nueva por cada
// archivo/recarga y agotar el pool de Postgres en hosting serverless.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
