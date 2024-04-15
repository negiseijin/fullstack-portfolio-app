import { z } from "zod";

export const RequestPost = z.object({
  title: z.string(),
  body: z.string(),
});
export type RequestPost = z.infer<typeof RequestPost>;

export const ResponsePost = z.object({
  ok: z.boolean(),
  message: z.string(),
});
export type ResponsePost = z.infer<typeof ResponsePost>;
