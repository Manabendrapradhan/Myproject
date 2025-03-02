import express from 'express';
import Wishlist from '../models/wishlistModel.js'; // Adjust the import path

import { isAuth, isAdmin, generateToken, baseUrl, mailgun } from '../utils.js';
const wishlistRouter = express.Router();

// Create or get a user's wishlist
wishlistRouter.post('/', isAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { products: [] }, // Initialize with an empty array if not found
      { new: true, upsert: true }
    );
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error creating or getting wishlist', error });
  }
});

// Add a product to the wishlist
wishlistRouter.post('/add', isAuth, async (req, res) => {
  const { productId } = req.body;
  try {
    await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $addToSet: { products: productId } }, // Adds productId if it doesn't already exist
      { new: true, upsert: true } // Create if it doesn't exist
    );
    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to wishlist', error });
  }
});

// Remove a product from the wishlist
wishlistRouter.delete('/remove', isAuth, async (req, res) => {
  const { productId } = req.body;
  try {
    await Wishlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { products: productId } } // Removes productId from the array
    );
    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing product from wishlist', error });
  }
});

// Get user's wishlist
wishlistRouter.get('/', isAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error });
  }
});

export default wishlistRouter;
