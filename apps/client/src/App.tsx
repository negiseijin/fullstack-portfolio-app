import { Suspense, lazy, useEffect, useState } from "react";
import { useCookie } from "./hooks/useCookie";
import { useLocalStorage } from "./hooks/useLocalStorage";

const Home = lazy(() =>
  import("./app/home").then((module) => ({ default: module.Home })),
);

function App() {
  useCookie("my-cookie", "Bret");
  useLocalStorage("my-LocalStorage", {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "Lucio_Hettinger@annie.ca",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: {
        lat: "-31.8129",
        lng: "62.5342",
      },
    },
    phone: "(254)954-1289",
    website: "demarco.info",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
  });

  return (
    <Suspense
      fallback={
        <div className="h-screen grid grid-flow-col justify-center items-center gap-3">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          Processing...
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}

export default App;
