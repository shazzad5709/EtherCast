import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client'

let i = 1
const data = Array.from({ length: 10 }).map(() => ({
  title: faker.company.buzzNoun(),
  election_code: String(i++)
}))

const prisma = new PrismaClient()

async function main() {
  await prisma.election.createMany({ data })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })