import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number(),
});

export type User = z.infer<typeof UserSchema>;
