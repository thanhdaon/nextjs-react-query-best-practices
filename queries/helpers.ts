import { z } from "zod";

export function createPaginationResponseSchema<T>(data: z.ZodType<T>) {
  return z.object({ data: data, total: z.number() });
}
