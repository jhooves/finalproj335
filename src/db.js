const mongoose = require('mongoose');

async function connectToDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error(
      'Missing MONGODB_URI. Set it in a .env file (see .env.example).'
    );
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri);
}

module.exports = { connectToDatabase };
