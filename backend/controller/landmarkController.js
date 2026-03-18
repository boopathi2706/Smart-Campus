const Landmark = require('../model/Landmark');

// GET all landmarks
exports.getLandmarks = async (req, res) => {
  try {
    const landmarks = await Landmark.find().sort({ id: 1 });
    res.json(landmarks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new landmark
exports.createLandmark = async (req, res) => {
  try {
    const allLandmarks = await Landmark.find();

    let nextId = '1';
    if (allLandmarks.length > 0) {
      const maxId = Math.max(...allLandmarks.map(l => parseInt(l.id) || 0));
      nextId = (maxId + 1).toString();
    }

    const newLandmark = new Landmark({ ...req.body, id: nextId });
    const savedLandmark = await newLandmark.save();

    res.status(201).json(savedLandmark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE landmark
exports.updateLandmark = async (req, res) => {
  try {
    const updated = await Landmark.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE landmark
exports.deleteLandmark = async (req, res) => {
  try {
    await Landmark.findOneAndDelete({ id: req.params.id });
    res.json({ message: 'Landmark deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};