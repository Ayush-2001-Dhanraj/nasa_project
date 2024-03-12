const launches = require("./launches.mongo");
const Planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("19 April 2025"),
  target: "Kepler-442 b",
  customers: ["Isro", "Nasa"],
  upcoming: true,
  success: true,
};

async function getAllLaunches() {
  return await launches.find({}, { _id: 0, __v: 0 });
}

async function saveLaunch(launch) {
  const planet = await Planets.findOne({ keplerName: launch.target });

  if (!planet) {
    throw new Error("No matching planet found!!");
  }

  try {
    await launches.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true }
    );
  } catch (error) {
    console.error(error);
  }
}

async function getLatestFlightNumber() {
  const flight = await launches.findOne().sort("-flightNumber");

  return flight.flightNumber || DEFAULT_FLIGHT_NUMBER;
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    upcoming: true,
    success: true,
    customers: ["Isro", "Nasa"],
  });

  await saveLaunch(newLaunch);
  return newLaunch;
}

async function launchExistsWithID(id) {
  return await launches.findOne({ flightNumber: id });
}

async function abortLaunchByID(id) {
  const response = await launches.updateOne(
    { flightNumber: id },
    { upcoming: false, success: false }
  );

  return response.ok;
}

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  launchExistsWithID,
  abortLaunchByID,
};
