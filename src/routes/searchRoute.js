import { Router } from "express";
import processRequestParams from "../middlewares/processRequestParams.js";
import { searchSchema } from "../schemas/search.schema.js";
import { search } from "../controllers/searchController.js";

const router=Router();

router.get('/search', processRequestParams(searchSchema), search);

export default router;