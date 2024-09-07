import { useSyncExternalStore } from "react";
import type { ScreensConfig } from "tailwindcss/types/config";

export const Screens = {
  pc: "1024px",
  sp: "960px",
} as const satisfies ScreensConfig;

interface WindowSize {
  width: number;
  height: number;
}

const getSnapshot = (): WindowSize => {
  console.log(window.innerWidth, Screens.sp);

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

const subscribe = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

export function useScreen() {
  const { height, width } = useSyncExternalStore(subscribe, getSnapshot);

  return {
    height,
    width,
  };
}
