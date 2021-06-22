import { useState } from "react";

export function Button() {
  // let number = 0;
  const [number, setNumber] = useState(0);

  function increment() {
    setNumber(number + 1);
    console.log(number);
  }

  return (
    <button onClick={increment}>{number}</button>
  )
}

