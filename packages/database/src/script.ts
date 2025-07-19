import { prisma } from '.'

async function main() {
  console.log('Start seeding ...')
  const allUsers = await prisma.user.findMany()
  console.log({ allUsers })
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
