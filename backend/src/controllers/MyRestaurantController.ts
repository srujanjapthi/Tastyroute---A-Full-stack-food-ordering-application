import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Order from "../models/order";

const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.send(restaurant);
  } catch (error: any) {
    console.log("Error", error);
    res.status(500).json({
      message: "Error fetching restaurant",
    });
  }
};

const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const exisitingRestaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (exisitingRestaurant) {
      return res.status(409).json({
        message: "User Restaurant already exists",
      });
    }

    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // // Any errors will take the control to catch block so that the error will be handled.
    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    const imageUrl = await uploadImage(req.file as Express.Multer.File);
    const restaurant = new Restaurant(req.body);

    restaurant.imageUrl = imageUrl;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    res.status(201).send(restaurant);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    (restaurant.deliveryPrice = deliveryPrice),
      (restaurant.estimatedDeliveryTime = estimatedDeliveryTime);
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    return res.status(200).send(restaurant);
  } catch (error: any) {
    console.log("Error", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const getMyRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant?.user._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "Unabel to update the order status",
    });
  }
};

const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  // Any errors will take the control to catch block so that the error will be handled.
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

  return uploadResponse.url;
};

export default {
  updateOrderStatus,
  getMyRestaurantOrders,
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};
