import { z } from 'zod'

const envSchema = z.object({
    AMBIENTE: z.enum(['develop','production']),

    SERVER_PORT: z.coerce.number(),

    DATABASE_HOST: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_PORT: z.coerce.number(),

    BCRIPTPASSWORDSALT: z.string(),

    JWTPRIVATEKEY: z.string().uuid()
});

export const envs = envSchema.parse(process.env)