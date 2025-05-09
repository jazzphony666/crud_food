import Link from "next/link";

export default function Navbar() {
    return(
    <nav className="flex justify-between items-center bg-gray-900 p-4 text-white">
        <Link className="text-white font-arial" href="/">Food</Link>
        <Link className="bg-purple-700 p-2" href="/addFood">Add Food</Link>
    </nav>
    )
}