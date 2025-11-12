import { Router, Request, Response } from "express";
import countryRoutes from "./country.routes";
import memoryRoutes from "./memory.routes";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json("All good in here");
});

router.use("/countries", countryRoutes);
router.use("/memories", memoryRoutes);

export default router;
