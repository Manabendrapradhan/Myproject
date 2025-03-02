import mongoose from 'mongoose';
import User from './userModel.js';
import Product from './productModel.js';

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: User,
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                unique: true, // Consider adding a unique constraint
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Add indexes for performance optimization (if needed)
wishlistSchema.index({ products: 1 });

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;