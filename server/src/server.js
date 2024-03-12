const http = require("http");

const { connectMongo } = require("./services/mongo");

const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  await connectMongo(process.env.CONNECTION_URL);

  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
