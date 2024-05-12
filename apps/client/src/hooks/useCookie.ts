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

// カスタムフック
export const useCookie = (cookieName: string) => {
  const [cookie, setCookie] = useState<string | null>(() =>
    getCookie(cookieName),
  );

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
};
// usage

// const [cookie, setCookie, deletedCookie] = useCookie("myCookie");

// // Cookieの値を設定する
// setCookie("newValue");

// // Cookieを削除する
// deletedCookie();
