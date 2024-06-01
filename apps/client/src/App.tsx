import { Home } from "./app/home";
import { useInit } from "./hooks/useInit";

function App() {
  const { isLoading } = useInit();

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
