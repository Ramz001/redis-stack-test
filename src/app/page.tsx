import db from "@/lib/db";
import Link from "next/link";

const getBooks = async () => {
  const result = await db.zRangeWithScores("books", 0, -1);

  const books = await Promise.all(
    result.map((b) => db.hGetAll(`books:${b.score}`))
  );
  return books;
};

export default async function Home() {
  const books = await getBooks();
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 px-4 py-8">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-3xl text-blue-100 drop-shadow">
          Books on Redis!
        </h1>
        <Link
          href="/create"
          className="bg-blue-600 text-black px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition border border-blue-900 shadow"
        >
          Add a new book
        </Link>
      </nav>

      <p className="mb-4 text-lg text-gray-200">List of books here.</p>
      {Array.isArray(books) && books.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {books.map((b, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 shadow hover:border-blue-700 transition"
            >
              <h2 className="text-2xl font-bold text-blue-300 mb-1">
                {b.title}
              </h2>
              <p className="text-gray-400 mb-2">by {b.author}</p>
              <p className="mb-2 text-gray-200">{b.blurb}</p>
              <p className="mt-2 mb-0 text-sm text-yellow-300">
                Rating: <span className="font-mono">{b.rating}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-neutral-400 bg-neutral-900 border border-neutral-800 rounded p-4 mt-6 text-center">
          No books found.
        </p>
      )}
    </main>
  );
}
