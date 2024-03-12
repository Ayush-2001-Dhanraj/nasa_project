const http = require("http");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.on("open", () => console.log("MongoDB connected"));

mongoose.connection.on("error", (err) => console.error(err));

const startServer = async () => {
  await mongoose.connect(process.env.CONNECTION_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
