const mongoose = require('mongoose');

export async function connectToMongoDB() {
  if (mongoose.connection.readyState) {
    return;
  }


  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');
  console.log('MONGO_URL', process.env.MONGO_URL);
}
