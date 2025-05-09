import mongoose, { Schema } from 'mongoose';

const foodSchema = new Schema({

    title:String,
    description:String,
}, {
    timestamps: true
});

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

export default Food;