import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findById(req.userId);

    if (!currentUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(currentUser);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    // 1. Check if the user exists.
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    // 2. Create the user if it doesn't exist.
    const newUser = new User(req.body);
    await newUser.save();

    // 3. Return the user object to the calling client.
    res.status(201).json(newUser.toObject());
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Error Creating the user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    // 1. Check if the user exists.
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 2. Update users field.
    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    // 3. Save updated user into the database.
    await user.save();

    // 4. Return the user object to the calling client.
    res.send(user);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      messgae: "Error updating user",
    });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
