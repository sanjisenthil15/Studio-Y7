import express from 'express';
import { getActiveHeroImage, uploadHeroImage, deleteHeroImage } from '../controllers/heroController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getActiveHeroImage);
router.post('/', protect, upload.single('image'), uploadHeroImage);
router.delete('/:id', protect, deleteHeroImage);

export default router;
