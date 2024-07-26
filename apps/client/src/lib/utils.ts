import { type ClassValue, clsx } from "clsx";
import { hc } from "hono/client";
import type { AppType } from "server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const client = hc<AppType>("http://localhost:3000/");

export async function sleep(seconds: number) {
  await new Promise((resolve) => setTimeout(resolve, seconds));
}
