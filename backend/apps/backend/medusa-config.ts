import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())
if (!process.env.JWT_SECRET) {
  loadEnv('development', process.cwd())
}

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: (process.env.DATABASE_URL?.includes('neon.tech') || process.env.DATABASE_URL?.includes('sslmode=require')) ? {
      connection: {
        ssl: { rejectUnauthorized: false }
      },
      pool: {
        min: 0,
        max: 2,
        idleTimeoutMillis: 500
      }
    } : {
      pool: {
        min: 0,
        max: 2,
        idleTimeoutMillis: 500
      }
    },
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  }
})
