"use client";

import { createBook } from "@/app/actions/create";
import { useState } from "react";

export default function Create() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: any) {
    const result: any = await createBook(formData);
    console.log(result);
    if (result?.error) {
      setError(result?.error);
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <form
        action={handleSubmit}
        className="bg-neutral-800 rounded-lg shadow p-8 w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-200">
          Add a New Book
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            type="number"
            name="rating"
            max={10}
            min={1}
            placeholder="Rating (1-10)"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <textarea
            name="blurb"
            placeholder="Blurb..."
            rows={3}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-black py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Add Book
        </button>
        {error && (
          <div className="mt-3 text-center text-sm text-red-200 bg-red-950 border border-red-600 rounded px-3 py-2">
            {error}
          </div>
        )}
      </form>
    </main>
  );
}
