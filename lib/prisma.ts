import { PrismaClient } from "@prisma/client"
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma


// MELAKUKKAN SETUP PRISMA, PRISMA CLIENT DAN PRISMA ADAPTER u/ AUTH 
// MELANJUTKAN SETUP AUTH DENGAN MEMBUAT ADAPTER AUTH DENGAN PRISMA 
// MEMBUAT DATABASE POSTGRES DENGAN NEON POSTGRES DI VERCEL 
// MELAKUKAN SET UP PADA SCHEMA.PRISMA datasource db url & directUrl
// MEMBUAT MODEL YANG DI PERLUKAN WEB MELALUI schema.prisma serta MEMBUAT HUBUNGAN 

