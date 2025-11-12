const express = require("express");
const router = express.Router();
const prisma = require("../db/index");

// GET /api/memories - Get all memories
router.get("/", async (req, res, next) => {
  try {
    const memories = await prisma.memory.findMany({
      include: { country: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(memories);
  } catch (error) {
    next(error);
  }
});

// GET /api/memories/:id - Get a single memory
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const memory = await prisma.memory.findUnique({
      where: { id: Number(id) },
      include: { country: true },
    });

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    res.json(memory);
  } catch (error) {
    next(error);
  }
});

// POST /api/memories - Create a new memory
router.post("/", async (req, res, next) => {
  try {
    const { title, description, location, countryId } = req.body;

    const memory = await prisma.memory.create({
      data: {
        title,
        description,
        location,
        countryId: Number(countryId),
      },
      include: { country: true },
    });

    res.status(201).json(memory);
  } catch (error) {
    next(error);
  }
});

// PUT /api/memories/:id - Update a memory
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, location } = req.body;

    const memory = await prisma.memory.update({
      where: { id: Number(id) },
      data: { title, description, location },
      include: { country: true },
    });

    res.json(memory);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/memories/:id - Delete a memory
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.memory.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
