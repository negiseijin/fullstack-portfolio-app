import { type ClassValue, clsx } from "clsx";
import { hc } from "hono/client";
import type { AppType } from "server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const client = hc<AppType>("http://localhost:3000/");
