const {
  getAllLaunches,
  scheduleNewLaunch,
  launchExistsWithID,
  abortLaunchByID,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const { mission, rocket, target, launchDate } = req.body;

  if (!mission || !rocket || !target || !launchDate) {
    return res.status(400).json({ err: "Launch properties missing!" });
  }

  const launch = { mission, rocket, target, launchDate };

  launch.launchDate = new Date(launch.launchDate);

  // isNaN(launch.launchDate) -> isNaN(launch.launchDate.valueOf()) -> valueOf valid date is a number otherwise NaN
  // or launch.launchDate.toString() == "Invalid Date"
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ err: "Invalid Date value!!" });
  }

  const newLaunch = await scheduleNewLaunch(launch);
  return res.status(201).json(newLaunch);
}

async function httpAbortLaunchWithID(req, res) {
  const launchID = +req.params.id;

  if (!(await launchExistsWithID(launchID))) {
    return res.status(404).json({ err: "Launch not found" });
  }

  const launchAborted = abortLaunchByID(launchID);

  if (!launchAborted)
    return res.status(400).json({ err: "Launch not aborted" });

  return res.status(200).json({ msg: "Launch aborted successfully" });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunchWithID,
};
