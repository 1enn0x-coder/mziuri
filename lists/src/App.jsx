import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <input type="text" placeholder="Enter something...">
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </input>
      <div className="bg-black text-white p-4">Count: {count}</div>
    </>
  );
}
