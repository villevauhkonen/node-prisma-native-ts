import { PrismaClient } from "./prisma/client/index.js";
import { getTimestamp, getRandomId } from "./utils.ts";

const prisma = new PrismaClient();

const seed = getRandomId();

console.log(`${getTimestamp()} Starting...`);

await prisma.user.deleteMany();

await prisma.user.create({
  data: {
    name: `test`,
    email: `${seed}@test.com`,
  },
});

const users = await prisma.user.findMany();

console.log(`${getTimestamp()} Users:`, users);

await prisma.$disconnect();

console.log(`${getTimestamp()} DONE!`);
