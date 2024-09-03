import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// /api/restaurant/:restauarantId
router.get(
  "/:restauarantId",
  param("restauarantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Restaurant Id must be a valid string"),
  RestaurantController.getRestaurant,
);

// /api/restaurant/search/:city => { city => London, Delhi, etc., }
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  RestaurantController.searchRestaurant,
);

export default router;
