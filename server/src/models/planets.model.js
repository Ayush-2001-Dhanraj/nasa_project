const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const Planets = require("./planets.mongo");

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetsData = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitable(data)) {
          // upsert means insert + update
          upsertPlanet(data);
        }
      })
      .on("error", (err) => reject(err))
      .on("end", async () => {
        const totalPlanets = (await getAllPlanets()).length;
        console.log(`${totalPlanets} Habitable planets found!!`);
        resolve();
      });
  });
};

async function upsertPlanet(planet) {
  try {
    await Planets.updateOne(
      { keplerName: planet.kepler_name },
      { keplerName: planet.kepler_name },
      { upsert: true }
    );
  } catch (error) {
    console.error(error);
  }
}

async function getAllPlanets() {
  return await Planets.find({});
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
