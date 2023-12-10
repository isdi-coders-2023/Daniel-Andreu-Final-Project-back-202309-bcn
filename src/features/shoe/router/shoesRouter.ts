import { Router } from "express";
import ShoesMongooseRepository from "../repository/ShoesMongooseRepository.js";
import ShoesController from "../controller/ShoesController.js";

const shoesRouter = Router();

const shoesRepository = new ShoesMongooseRepository();
const shoesController = new ShoesController(shoesRepository);

shoesRouter.get("/", shoesController.getShoes);
shoesRouter.delete("/:shoeId", shoesController.deleteShoe);
shoesRouter.post("/", shoesController.addShoe);

export default shoesRouter;
