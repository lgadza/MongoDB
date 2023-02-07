import createHttpError from "http-errors";
import atob from "atob";
import AuthorModel from "../../api/authors/model.js";

export const basicAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      createHttpError(
        401,
        "Please provide credentials in the Authorization header!"
      )
    );
  } else {
    const encodedCredentials = req.headers.authorization.split(" ")[1];

    const credentials = atob(encodedCredentials);

    const [email, password] = credentials.split(":");

    const author = await AuthorModel.checkCredentials(email, password);
    if (author) {
      req.author = author;

      next();
    } else {
      next(createHttpError(401, "Credentials not ok!"));
    }
  }
};
