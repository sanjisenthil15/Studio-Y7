import SiteContent from '../models/SiteContent.js';

export const getContent = async (req, res) => {
  try {
    const content = await SiteContent.findOne({ section: req.params.section });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContent = async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { section: req.params.section },
      { content: req.body.content },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllContent = async (req, res) => {
  try {
    const content = await SiteContent.find();
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
