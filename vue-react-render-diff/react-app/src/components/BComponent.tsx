import { useState } from "react";
import CComponent from "./CComponent";

export default function BComponent() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter((prev) => prev + 1);
  }
  return (
    <>
      <label>
        <CComponent number={counter} />
      </label>
      <button onClick={increment}>Increment</button>
    </>
  );
}
