'use client';

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditFoodContent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    const getFoodById = async () => {
      if (!id) {
        setError("No food ID provided");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/food/${id}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch food");
        }
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setError(null);
      } catch (error) {
        console.error("Error fetching food:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getFoodById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/food/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle: title, newDescription: description }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update food");
      }

      router.push("/");
    } catch (error) {
      console.error("Error updating food:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

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
        Update Food
      </button>
    </form>
  );
}

export default function EditFood() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <EditFoodContent />
    </Suspense>
  );
}
