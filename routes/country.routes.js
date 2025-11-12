const express = require("express");
const router = express.Router();
const prisma = require("../db/index");

// GET /api/countries - Get all countries
router.get("/", async (req, res, next) => {
  try {
    const countries = await prisma.country.findMany({
      include: { memories: true }, // Include related memories
      orderBy: { createdAt: "desc" },
    });
    res.json(countries);
  } catch (error) {
    next(error);
  }
});

// GET /api/countries/:id - Get a single country by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const country = await prisma.country.findUnique({
      where: { id: Number(id) },
      include: { memories: true },
    });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.json(country);
  } catch (error) {
    next(error);
  }
});

// POST /api/countries - Create a new country
router.post("/", async (req, res, next) => {
  try {
    const { name, favoriteCity, favoriteFood, visitedDate, flagEmoji } =
      req.body;

    const country = await prisma.country.create({
      data: {
        name,
        favoriteCity,
        favoriteFood,
        visitedDate: visitedDate ? new Date(visitedDate) : null,
        flagEmoji,
      },
    });

    res.status(201).json(country);
  } catch (error) {
    next(error);
  }
});

// PUT /api/countries/:id - Update a country
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, favoriteCity, favoriteFood, visitedDate, flagEmoji } =
      req.body;

    const country = await prisma.country.update({
      where: { id: Number(id) },
      data: {
        name,
        favoriteCity,
        favoriteFood,
        visitedDate: visitedDate ? new Date(visitedDate) : null,
        flagEmoji,
      },
    });

    res.json(country);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/countries/:id - Delete a country
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.country.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
