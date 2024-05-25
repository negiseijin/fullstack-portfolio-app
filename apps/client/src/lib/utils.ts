import { useCookie } from "@/hooks/useCookie";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { type ClassValue, clsx } from "clsx";
import { hc } from "hono/client";
import type { AppType } from "server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const client = hc<AppType>("http://localhost:3000/");

type User = {
  id: string;
  name: string;
};

type Employee = {
  id: string;
  email: string;
};

type People = User | Employee;

const people: People[] = [
  { id: "1", name: "aaaa" },
  { id: "2", name: "bbbbb" },
  { id: "3", email: "aaaa.com" },
  { id: "4", email: "bbbb.com" },
];

for (const person of people) {
  if (isEmployee(person)) {
    console.log(person.email);
  }
  if (isUser(person)) {
    console.log(person.name);
  }
}

function isEmployee(people: People): people is Employee {
  return "email" in people;
}

function isUser(people: People): people is User {
  return "name" in people;
}

export function stubInit() {
  useCookie("name", "Bret");
  useLocalStorage<{ name: string }>("user", {
    name: "Antonette",
  });
}
