import { useState } from "react";

// ジェネリックな型パラメータTを定義
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // ローカルストレージからデータを取得する
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // ローカルストレージにデータを保存する
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
};

// USage
// const [name, setName, removeName] = useLocalStorage<string>('name', '');
// const [age, setAge, removeAge] = useLocalStorage<number>('age', 0);
// const [user, setUser, removeUser] = useLocalStorage<{ name: string; age: number }>(
//   'user',
//   { name: '', age: 0 }
// );

// // 値を削除する
// removeName();
// removeAge();
// removeUser();
