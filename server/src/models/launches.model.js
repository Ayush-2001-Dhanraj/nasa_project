const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("19 April 2025"),
  destination: "Kepler-422 b",
  customer: ["Isro", "Nasa"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

module.exports = { launches };
