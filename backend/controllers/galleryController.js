import Gallery from '../models/Gallery.js';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';

export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ order: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch images: ${error.message}` });
  }
};

export const uploadImage = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file selected. Please choose an image to upload.' });
    }

    const { title, category, featured } = req.body;

    // Validate required fields
    if (!title || !category) {
      if (req.file?.path) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Title and category are required' });
    }

    let imageUrl, cloudinaryId;

    // Use Cloudinary if configured, otherwise use local storage
    if (isCloudinaryConfigured) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'studio-y7/gallery'
        });
        imageUrl = result.secure_url;
        cloudinaryId = result.public_id;
        
        // Delete local file after uploading to Cloudinary
        fs.unlinkSync(req.file.path);
      } catch (cloudinaryError) {
        if (req.file?.path) fs.unlinkSync(req.file.path);
        return res.status(500).json({ message: `Cloudinary upload failed: ${cloudinaryError.message}` });
      }
    } else {
      // Use local storage
      const fileName = path.basename(req.file.path);
      imageUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/gallery/${fileName}`;
      cloudinaryId = fileName; // Use filename as ID for local storage
    }

    // Save to database
    const image = await Gallery.create({
      title,
      imageUrl,
      cloudinaryId,
      category,
      featured: featured === 'true' || featured === true
    });

    res.status(201).json(image);
  } catch (error) {
    // Clean up file if it exists
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: `Upload failed: ${error.message}` });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { title, category, featured } = req.body;
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, category, featured: featured === 'true' || featured === true },
      { new: true }
    );
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: `Update failed: ${error.message}` });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Delete from Cloudinary or local storage
    if (isCloudinaryConfigured) {
      try {
        await cloudinary.uploader.destroy(image.cloudinaryId);
      } catch (cloudinaryError) {
        console.error('Cloudinary delete error:', cloudinaryError);
      }
    } else {
      // Delete local file
      const filePath = path.join(process.cwd(), 'uploads', 'gallery', image.cloudinaryId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await image.deleteOne();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Delete failed: ${error.message}` });
  }
};

export const reorderImages = async (req, res) => {
  try {
    const { images } = req.body;
    
    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ message: 'Invalid images array' });
    }
    
    await Promise.all(
      images.map((img, index) => 
        Gallery.findByIdAndUpdate(img.id, { order: index })
      )
    );
    
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ message: `Reorder failed: ${error.message}` });
  }
};
