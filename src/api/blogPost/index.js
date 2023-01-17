import express from "express";
import createHttpError from "http-errors";
import BlogPostModel from "./model.js";

const blogPostRouter = express.Router();

blogPostRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new BlogPostModel(req.body);

    const { _id } = await newUser.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get("/", async (req, res, next) => {
  try {
    const blogPost = await BlogPostModel.find();
    res.send(blogPost);
  } catch (error) {
    next(error);
  }
});

blogPostRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await BlogPostModel.findById(req.params.userId);
    if (user) {
      res.send(user);
    } else {
      next(
        createHttpError(404, `User with id ${req.params.userId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

blogPostRouter.put("/:userId", async (req, res, next) => {
  try {
    const updatedUser = await BlogPostModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(
        createHttpError(404, `User with id ${req.params.userId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

blogPostRouter.delete("/:userId", async (req, res, next) => {
  try {
    const deletedUser = await BlogPostModel.findByIdAndDelete(
      req.params.userId
    );

    if (deletedUser) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `User with id ${req.params.userId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default blogPostRouter;
