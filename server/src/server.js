const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const CONNECTION_URL =
  "mongodb+srv://dev:sFbBKCILcR5TY3WQ@nasa-api.of0uvl7.mongodb.net/?retryWrites=true&w=majority&appName=nasa-api";

const server = http.createServer(app);

mongoose.connection.on("open", () => console.log("MongoDB connected"));

mongoose.connection.on("error", (err) => console.error(err));

const startServer = async () => {
  await mongoose.connect(CONNECTION_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
