import { useCallback, useState } from "react";

// Cookieを取得する関数
function getCookie(name: string): string | null {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() || null : null;
}

// Cookieを削除する関数
function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * @example
 * // Cookie if no default value is set
 * const [cookie, setCookie, deleteCookie] = useCookie('cookieName');
 *
 * // Cookie to set default values
 * const [cookie, setCookie, deleteCookie] = useCookie('cookieName', 'defaultValue');
 */
export function useCookie(
  cookieName: string,
  defaultValue: string | null = null,
) {
  const [cookie, setCookie] = useState<string | null>(() => {
    if (getCookie(cookieName)) {
      return getCookie(cookieName);
    }

    if (defaultValue !== null) {
      document.cookie = `${cookieName}=${defaultValue}; path=/`;
    }
    return defaultValue;
  });

  const handleSetCookie = useCallback(
    (value: string) => {
      document.cookie = `${cookieName}=${value}; path=/`;
      setCookie(value);
    },
    [cookieName],
  );

  const handleDeleteCookie = useCallback(() => {
    deleteCookie(cookieName);
    setCookie(null);
  }, [cookieName]);

  return [cookie, handleSetCookie, handleDeleteCookie] as const;
}
