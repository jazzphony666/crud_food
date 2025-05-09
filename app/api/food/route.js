import Food from '@/models/food.js';
import connectMongoDB from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectMongoDB();

        const { title, description } = await req.json();

        if (!title || !description) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
        }

        const newFood = new Food({ title, description });
        await newFood.save();

        return new Response(JSON.stringify({ message: "Food created successfully" }), { status: 201 });
    } catch (error) {
        console.error("❌ Error creating food:", error.message);
        return new Response(JSON.stringify({ message: "Error creating food" }), { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const food = await Food.find({});
        return NextResponse.json({ food });
    } catch (error) {
        console.error("❌ Error fetching food:", error.message);
        return new Response(JSON.stringify({ message: "Error fetching food" }), { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get("id");

        if (!id) {
            return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
        }

        await connectMongoDB();
        await Food.findByIdAndDelete(id);

        return NextResponse.json({ message: "Food deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error deleting food:", error.message);
        return new Response(JSON.stringify({ message: "Error deleting food" }), { status: 500 });
    }
}
