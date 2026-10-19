import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  function HandleAdd() {
    if (name.trim() !== "") {
      setItems([...items, name]);
      setName("");
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Add a new item..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={HandleAdd}>Add</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      ></div>
    </>
  );
}
