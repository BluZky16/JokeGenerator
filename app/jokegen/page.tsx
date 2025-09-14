// app/page.tsx
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Dropdown from "../components/dropdown";

export default function Joke() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("Flirty");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, humor: selected }), // send both prompt + humor
      });

      const data = await res.json();
      setResponse(data.output);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
  <div className="h-screen flex flex-col items-center justify-start pt-48 p-4">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-2">Joke Generator</h1>
      <p className="text-lg text-gray-600">
        Don't let the silence get to you. Generate a joke and break the ice!
      </p>
    </div>
    <div className="relative flex flex-col gap-4 w-full max-w-md">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="p-3 border rounded bg-gray-100"
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="generate-button"
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
      <Dropdown selected={selected} setSelected={setSelected} />
    </div>
    {response && (
    <div className="mt-6 max-w-3xl p-4 border rounded bg-gray-50">
     <ReactMarkdown>{response}</ReactMarkdown>
    </div>
    )}
  </div>
  );
}