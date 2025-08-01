import type { ProblemDetails, ProblemDetailsInput } from './problem';

export type Ok<T> = { ok: true; value: T };
export type Err<E = ProblemDetailsInput> = { ok: false; error: E };
export type Result<T, E = ProblemDetails> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ ok: true, value });
export const err = <E = ProblemDetailsInput>(error: E): Err<E> => ({ ok: false, error });
