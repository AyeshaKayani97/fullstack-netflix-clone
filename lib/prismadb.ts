import { PrismaClient } from "@prisma/client";

// initialize prismaCllient object instance

const client = global.prismadb || new PrismaClient()

if(process.env.NODE_ENV === "production") global.prismadb == client

export default client;