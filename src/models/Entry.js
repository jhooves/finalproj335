const mongoose = require('mongoose');

const WeatherSnapshotSchema = new mongoose.Schema(
  {
    resolvedName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    temperatureC: { type: Number, required: true },
    weatherCode: { type: Number, required: true },
    fetchedAt: { type: Date, required: true }
  },
  { _id: false }
);

const EntrySchema = new mongoose.Schema(
  {
    city: { type: String, required: true, trim: true, maxlength: 80 },
    note: { type: String, required: true, trim: true, maxlength: 280 },
    weather: { type: WeatherSnapshotSchema, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

module.exports = mongoose.model('Entry', EntrySchema);
