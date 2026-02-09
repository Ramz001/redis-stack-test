"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function createBook(formData: any) {
  try {
    const { title, rating, author, blurb } = Object.fromEntries(formData);

    const id = Math.floor(Math.random() * 1000000); // Ensure numeric id

    const unique = await db.zAdd(
      "books",
      {
        value: title,
        score: id,
      },
      { condition: "NX" }
    );
    if (!unique) {
      return { error: "That book already added" };
    }

    return await db.hSet(`books:${id}`, { title, rating, author, blurb });
  } catch (error) {
    return { error };
  }
}
