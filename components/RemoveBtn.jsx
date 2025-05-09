"use client";
import { HiOutlineTrash } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id, onDelete }) {
  const router = useRouter();
  const removeFood = async () => {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/food?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          onDelete?.();
          router.refresh();
        } else {
          throw new Error("Failed to delete food");
        }
      } catch (error) {
        console.error("Error deleting food:", error);
      }
    }
  };

  return <button onClick={removeFood} className="text-red-500">
    <HiOutlineTrash size={20} className="text-red-500 hover:text-red-700" />
    <span className="sr-only">Remove</span>
  </button>;
}