'use client';

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FoodList() {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchFood = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/food", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch food");
      }

      const data = await res.json();
      setFood(data.food || []);
    } catch (error) {
      console.error("Error fetching food:", error);
      setError("Failed to load food data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h2 className="font-arial text-2xl mb-4">List of favorite food</h2>
      <div className="mb-6">Please add your favorite dish to the list</div>
      {food.map((item) => (
        <div
          key={item._id}
          className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-start mb-4"
        >
          <div>
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
          <div className="flex gap-3 items-center">
            <RemoveBtn id={item._id} onDelete={fetchFood} />
            <Link href={`/editFood?id=${item._id}`}>
              <HiPencilAlt size={20} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
