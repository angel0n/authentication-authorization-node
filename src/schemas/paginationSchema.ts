import { z } from "zod"

export type Pagination = z.infer<typeof paginationSchema>
export const paginationSchema = z.object({
    page: z.coerce.number().min(1),
    limit: z.coerce.number().min(1),
})