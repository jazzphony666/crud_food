'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddFood() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description required.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        throw new Error("Failed to add food");
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10">
      <input
        type="text"
        placeholder="Food Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-slate-500 px-9 py-2"
        required
      />

      <input
        type="text"
        placeholder="Food Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border border-slate-500 px-9 py-2"
        required
      />

      <button
        type="submit"
        className="bg-blue-700 font-arial text-white py-3 px-6 w-fit"
      >
        Add Food
      </button>
    </form>
  );
}
