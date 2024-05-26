import { Home } from "./app/home";
import { useInit } from "./hooks/useInit";

// const Home = lazy(() =>
//   import("./app/home").then((module) => ({ default: module.Home })),
// );

function App() {
  const { data, init, isLoading } = useInit();
  console.log({ data }, { init }, { isLoading });

  if (isLoading) {
    return (
      <div className="h-screen grid grid-flow-col justify-center items-center gap-3">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        Processing...
      </div>
    );
  }

  return <Home />;
}

export default App;
