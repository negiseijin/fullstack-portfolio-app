import { useMediaQuery } from "@/hooks/useMediaQuery";

export function MediaQuery() {
  const isPC = useMediaQuery("pc");

  return (
    <div>
      <h2>isPC: {isPC ? "true" : "false"}</h2>
    </div>
  );
}
