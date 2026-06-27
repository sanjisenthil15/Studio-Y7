import Testimonial from '../models/Testimonial.js';
import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: `Failed to fetch testimonials: ${error.message}` });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, content, rating } = req.body;
    
    if (!name || !role || !content) {
      return res.status(400).json({ message: 'Name, role, and content are required' });
    }
    
    let imageUrl = '';
    let cloudinaryId = '';

    if (req.file) {
      if (isCloudinaryConfigured) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'studio-y7/testimonials'
          });
          imageUrl = result.secure_url;
          cloudinaryId = result.public_id;
          fs.unlinkSync(req.file.path);
        } catch (cloudinaryError) {
          if (req.file?.path) fs.unlinkSync(req.file.path);
          return res.status(500).json({ message: `Image upload failed: ${cloudinaryError.message}` });
        }
      } else {
        // Use local storage
        const fileName = path.basename(req.file.path);
        imageUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${fileName}`;
        cloudinaryId = fileName;
      }
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      content,
      rating: rating || 5,
      imageUrl,
      cloudinaryId
    });

    res.status(201).json(testimonial);
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: `Failed to create testimonial: ${error.message}` });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: `Failed to update testimonial: ${error.message}` });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    
    // Delete image if exists
    if (testimonial.cloudinaryId) {
      if (isCloudinaryConfigured) {
        try {
          await cloudinary.uploader.destroy(testimonial.cloudinaryId);
        } catch (err) {
          console.error('Cloudinary delete error:', err);
        }
      } else {
        // Delete local file
        const filePath = path.join(process.cwd(), 'uploads', testimonial.cloudinaryId);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    
    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: `Failed to delete testimonial: ${error.message}` });
  }
};
