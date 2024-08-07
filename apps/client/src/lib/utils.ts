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

// function saveData(data) {
//   const dbName = "MyDatabase";
//   const dbVersion = 1;
//   const storeName = "MyStore";

//   const request = indexedDB.open(dbName, dbVersion);

//   request.onerror = (event) => {
//     console.error("データベースを開くのに失敗しました:", event.target.error);
//   };

//   request.onsuccess = (event) => {
//     const db = event.target.result;
//     const transaction = db.transaction([storeName], "readwrite");
//     const store = transaction.objectStore(storeName);

//     const addRequest = store.add(data);

//     addRequest.onerror = (event) => {
//       if (event.target.error.name === "QuotaExceededError") {
//         console.log("ストレージの容量を超過しました");
//         // ここで容量超過時の処理を行う
//         handleQuotaExceeded(db, data);
//       } else {
//         console.error("データの追加に失敗しました:", event.target.error);
//       }
//     };

//     addRequest.onsuccess = () => {
//       console.log("データが正常に保存されました");
//     };
//   };
// }

// function handleQuotaExceeded(db, newData) {
//   const storeName = "MyStore";
//   const transaction = db.transaction([storeName], "readwrite");
//   const store = transaction.objectStore(storeName);

//   // 古いデータを削除する
//   const countRequest = store.count();
//   countRequest.onsuccess = () => {
//     const totalRecords = countRequest.result;
//     const recordsToDelete = Math.ceil(totalRecords * 0.2); // 20%のデータを削除

//     store.openCursor().onsuccess = (event) => {
//       const cursor = event.target.result;
//       if (cursor && recordsToDelete > 0) {
//         store.delete(cursor.key);
//         recordsToDelete--;
//         cursor.continue();
//       } else {
//         // 古いデータを削除した後、新しいデータを再度追加
//         store.add(newData);
//       }
//     };
//   };
// }

// // 使用例
// const myData = { id: 1, name: "テストデータ" };
// saveData(myData);
