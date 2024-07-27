import { useState } from "react";

export function Welcome() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setShow(!show)}>
        {show ? "Remove" : "Show"}
      </button>
      <hr />
      {show && (
        <div className="text-white p-12 text-center text-5xl  bg-gradient-radial from-blue-500 to-pink-500 animate-fadeIn">
          welcome
        </div>
      )}
    </>
  );
}
