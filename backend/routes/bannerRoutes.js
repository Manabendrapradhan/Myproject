import express from 'express';
import Banner from '../models/banner.js';

const bannerRouter = express.Router();

// Get all banners
bannerRouter.get('/', async (req, res) => {
    try {
        const banners = await Banner.find({});
        res.json(banners);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching banners' });
    }
});

// Get active banners
bannerRouter.get('/active', async (req, res) => {
    try {
        const activeBanners = await Banner.find({
            active: true,
            expiryDate: { $gte: new Date() },
        });
        res.json(activeBanners);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching active banners' });
    }
});

// Toggle banner status
bannerRouter.put('/:id/toggle', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            banner.active = !banner.active;
            await banner.save();
            res.send({ message: 'Banner status updated' });
        } else {
            res.status(404).send({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating banner' });
    }
});

// Update banner expiry date
bannerRouter.put('/:id/expiry', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (banner) {
            banner.expiryDate = req.body.expiryDate;
            await banner.save();
            res.send({ message: 'Banner expiry date updated' });
        } else {
            res.status(404).send({ message: 'Banner not found' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error updating expiry date' });
    }
});

// Add a new banner
bannerRouter.post('/', async (req, res) => {
    const { title, image, active, expiryDate } = req.body;
    const newBanner = new Banner({
        title,
        image,
        active: active || false,
        expiryDate: expiryDate || null,
    });

    try {
        const savedBanner = await newBanner.save();
        res.status(201).json(savedBanner);
    } catch (error) {
        res.status(500).send({ message: 'Error adding banner' });
    }
});

export default bannerRouter;
