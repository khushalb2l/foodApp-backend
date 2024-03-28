import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const ValidateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest=[
  body("restaurantName").notEmpty().withMessage("Restaurant name required"),
  body("city").notEmpty().withMessage("City name required"),
  body("country").notEmpty().withMessage("Country name required"),
  body("deliveryPrice").isFloat({min:0}).withMessage("Delivery price must be positive number"),
  body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated Time must be positive number"),
  body("cuisines").isArray().withMessage("Cuisines must be Array").not().isEmpty().withMessage("Cuisines Array can't be empty"),
  body("menuItems").isArray().withMessage("Menu Items must be array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name required"),
  body("menuItems.*.price").isFloat({min:0}).withMessage("Menu item price is required with positive number"),
  handleValidationErrors,
  
];