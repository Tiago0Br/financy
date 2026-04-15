import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { env } from '../env.js'
import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = `${env.DATABASE_URL}`

const adapter = new PrismaBetterSqlite3({ url: connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
