import connectMongoDB from "@/libs/mongodb";
import Food from "@/models/food";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { newTitle: title, newDescription: description } = await request.json();

        await connectMongoDB();
        await Food.findByIdAndUpdate(id, { title, description });

        return NextResponse.json({ message: "Food updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error updating food:", error.message);
        return NextResponse.json({ message: "Error updating food" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;

        await connectMongoDB();
        const food = await Food.findOne({ _id: id });

        if (!food) {
            return NextResponse.json({ message: "Food not found" }, { status: 404 });
        }

        return NextResponse.json(food, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching food:", error.message);
        return NextResponse.json({ message: "Error fetching food" }, { status: 500 });
    }
}
