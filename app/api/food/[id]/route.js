import connectMongoDB from "@/libs/mongodb";
import Food from "@/models/food";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid food ID" }, { status: 400 });
        }

        const { newTitle: title, newDescription: description } = await request.json();

        await connectMongoDB();
        const updatedFood = await Food.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        if (!updatedFood) {
            return NextResponse.json({ message: "Food not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Food updated successfully", food: updatedFood }, { status: 200 });
    } catch (error) {
        console.error("❌ Error updating food:", error.message);
        return NextResponse.json({ message: "Error updating food" }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const { id } = params;

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid food ID" }, { status: 400 });
        }

        await connectMongoDB();
        const food = await Food.findById(id);

        if (!food) {
            return NextResponse.json({ message: "Food not found" }, { status: 404 });
        }

        return NextResponse.json(food, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching food:", error.message);
        return NextResponse.json({ message: "Error fetching food" }, { status: 500 });
    }
} 