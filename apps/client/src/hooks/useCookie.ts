import { useEffect, useState } from "react";

// Cookieを取得する関数
function getCookie(name: string): string | undefined {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : "";
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// カスタムフック
export const useCookie = (cookieName: string) => {
  const [cookie, setCookie] = useState("");

  useEffect(() => {
    const value = getCookie(cookieName) ?? "";
    setCookie(value);
  }, [cookieName]);

  const handleSetCookie = (value: string) => {
    document.cookie = `${cookieName}=${value}; path=/`;
    setCookie(value);
  };

  const handleDeleteCookie = () => {
    deleteCookie(cookieName);
    setCookie("");
  };

  return [cookie, handleSetCookie, handleDeleteCookie] as const;
};

// usage

// const [cookie, setCookie, deletedCookie] = useCookie("myCookie");

// // Cookieの値を設定する
// setCookie("newValue");

// // Cookieを削除する
// deletedCookie();
