import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [json, setJson] = useState(null);

  const sendMessage = async () => {
    if (!input) return;

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setJson(data.updatedLayout);
    setInput("");
  };

  return (
  <div style={{ padding: "20px" }}>
    <h2>Chat Layout Agent</h2>

    {/* CHAT INPUT */}
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type: make headline bigger"
      style={{ width: "300px", padding: "5px" }}
    />

    <br /><br />
    <button onClick={sendMessage}>Send</button>

    {/* WIREFRAME PREVIEW */}
    {json && (
      <div
        style={{
          marginTop: "30px",
          border: "1px solid #ccc",
          padding: "20px",
          width: json.artboard?.width || 600,
          height: json.artboard?.height || 400,
        }}
      >
        <h1
          style={{
            fontSize: json.headline?.fontSize || 24,
            textAlign: "center",
          }}
        >
          {json.headline?.text || "Sample Headline"}
        </h1>
      </div>
    )}

    {/* JSON VIEWER */}
    <pre style={{ marginTop: "20px", background: "#eee", padding: "10px" }}>
      {json && JSON.stringify(json, null, 2)}
    </pre>
  </div>
);
}

export default App;