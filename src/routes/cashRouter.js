import { Router } from "express";
import { allTransactions, newIncome, newOutcome } from "../controllers/cashController.js";
import cashSchemaValidationMiddleware from "../middlewares/cashSchemaValidationMiddleware.js";
import tokenValidationMiddleware from "../middlewares/tokenValidationMiddleware.js";


const cashRouter = Router();
cashRouter.use(tokenValidationMiddleware);
cashRouter.get("/cash/allTransactions", allTransactions);
cashRouter.post("/cash/newIncome", cashSchemaValidationMiddleware, newIncome);
cashRouter.post("/cash/newOutcome", cashSchemaValidationMiddleware, newOutcome);

export default cashRouter;