const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// Import and use country routes
const countryRoutes = require("./country.routes");
router.use("/countries", countryRoutes);

// Import and use memory routes
const memoryRoutes = require("./memory.routes");
router.use("/memories", memoryRoutes);

module.exports = router;
