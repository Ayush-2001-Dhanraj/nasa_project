const mongoose = require("mongoose");

mongoose.connection.on("open", () => console.log("MongoDB connected"));

mongoose.connection.on("error", (err) => console.error(err));

async function connectMongo(connectionURL) {
  await mongoose.connect(connectionURL);
}

async function disconnectMongo() {
  await mongoose.disconnect();
}

module.exports = {
  connectMongo,
  disconnectMongo,
};
