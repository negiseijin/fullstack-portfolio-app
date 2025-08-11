import z from 'zod';
import type { ProblemDetails } from './problem';

export const zOk = <T extends z.ZodType>(value: T) =>
  z.object({
    ok: z.literal(true),
    value: value,
  });

export const zErr = <E extends ProblemDetails>(error: E) =>
  z.object({
    ok: z.literal(false),
    error: error,
  });

export const zResult = <T extends z.ZodType, E extends ProblemDetails>(value: T, error: E) =>
  z.discriminatedUnion('ok', [zOk(value), zErr(error)]);

export type OkOf<T extends z.ZodType> = z.infer<ReturnType<typeof zOk<T>>>;
export type ErrOf<E extends ProblemDetails> = z.infer<ReturnType<typeof zErr<E>>>;
export type ResultOf<T extends z.ZodType, E extends ProblemDetails> = z.infer<
  ReturnType<typeof zResult<T, E>>
>;

export const makeOk = <T extends z.ZodType>(value: T) => {
  const okSchema = zOk(value);
  return (value: z.input<T>): z.infer<typeof okSchema> => okSchema.parse({ ok: true, value });
};

export const makeErr = <E extends ProblemDetails>(error: E) => {
  const errSchema = zErr(error);
  return (error: z.input<E>): z.infer<typeof errSchema> => errSchema.parse({ ok: false, error });
};

export const isOk = <T extends { ok: boolean }>(r: T): r is Extract<T, { ok: true }> =>
  r.ok === true;

export const isErr = <T extends { ok: boolean }>(r: T): r is Extract<T, { ok: false }> =>
  r.ok === false;
