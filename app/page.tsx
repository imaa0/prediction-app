"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");

    if (!inputVal.trim()) {
      setError("Please enter a name");
      return;
    }

    push(`/prediction/${inputVal}`);
  };

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Enter your name</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Type your name..."
            value={inputVal}
            className="w-full px-4 py-2 border rounded text-black"
            onChange={(e) => setInputVal(e.target.value)}
          />
          {error && <p className="text-white-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Predict Data
          </button>
        </form>
      </div>
    </div>
  );
}
