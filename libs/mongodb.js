import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://jazminmorales23b:zxbnHgULJR46wL6R@crud.jfwf66a.mongodb.net/crud_db";

const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("✅ Ya estás conectado a MongoDB.");
            return;
        }

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        throw error;
    }
};

export default connectMongoDB;
