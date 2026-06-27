import HeroImage from '../models/HeroImage.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

export const getActiveHeroImage = async (req, res) => {
  try {
    const hero = await HeroImage.findOne({ active: true }).sort({ createdAt: -1 });
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadHeroImage = async (req, res) => {
  try {
    await HeroImage.updateMany({}, { active: false });
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'studio-y7/hero'
    });

    const hero = await HeroImage.create({
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
      active: true
    });

    fs.unlinkSync(req.file.path);
    res.status(201).json(hero);
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: error.message });
  }
};

export const deleteHeroImage = async (req, res) => {
  try {
    const hero = await HeroImage.findById(req.params.id);
    await cloudinary.uploader.destroy(hero.cloudinaryId);
    await hero.deleteOne();
    res.json({ message: 'Hero image deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
