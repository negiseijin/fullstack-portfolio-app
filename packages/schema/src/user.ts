import { z } from "zod";

export const RequestUser = z.object({
  username: z.string(),
});
export type RequestUser = z.infer<typeof RequestUser>;

export const ResponseUser = z
  .object({
    id: z.number(),
    name: z.string(),
    username: z.string(),
    email: z.string().email(),
    address: z.object({
      street: z.string(),
      suite: z.string(),
      city: z.string(),
      zipcode: z.string(),
      geo: z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    }),
    phone: z.string(),
    website: z.string(),
    company: z.object({
      name: z.string(),
      catchPhrase: z.string(),
      bs: z.string(),
    }),
  })
  .array();
export type ResponseUser = z.infer<typeof ResponseUser>;
