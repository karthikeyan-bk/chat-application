// backend/src/config/database.js
// placeholder - connect to your DB (Mongo/Postgres) here. Example for mongoose:
/*
const mongoose = require('mongoose');
const { MONGO_URI } = require('./environment');

async function connect() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('MongoDB connected');
}

module.exports = { connect };
*/

module.exports = {
  connect: async () => {
    console.log('database.connect called — configure a real DB in backend/src/config/database.js');
  }
};
