import { useCallback, useSyncExternalStore } from "react";
import type { ScreensConfig } from "tailwindcss/types/config";

export const screens = {
  pc: "1024px",
  sp: "960px",
} as const satisfies ScreensConfig;

/**
 * Custom hooks to monitor media query status.
 *
 * @param breakPoints - media query
 * @returns Returns true if a media query is matched, otherwise returns false.
 *
 * @example
 * function Components() {
 *   const isPC = useMediaQuery("pc");
 *   return (
 *     <div>
 *       {isPC ? <ComponentsPC /> : <ComponentsSP />}
 *     </div>
 *   );
 * }
 */
export function useMediaQuery(breakPoints: keyof typeof screens): boolean {
  const query = `(min-width: ${screens[breakPoints]})`;
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query],
  );

  const getSnapshot = useCallback((): boolean => {
    return window.matchMedia(query).matches;
  }, [query]);

  const getServerSnapshot = useCallback((): boolean => {
    // return false for server-side rendering
    return false;
  }, []);

  return useSyncExternalStore<boolean>(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
}
