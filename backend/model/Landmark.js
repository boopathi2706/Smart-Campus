const mongoose = require('mongoose');

const landmarkSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  category: { type: String, required: true },
  // ADD THIS NEW FIELD:
  floorInfo: { type: String, default: '' } 
}, { timestamps: true });

module.exports = mongoose.model('Landmark', landmarkSchema);