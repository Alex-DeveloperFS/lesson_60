import { Router } from "express";
import {
  deletePostByIdHandler,
  getPostByIdHandler,
  getPostsHandler,
  postPostsHandler,
  putPostByIdHandler
} from "../controllers/posts.mjs";
import { validateParamsPostsId, validatePostsPost, validatePostsPut } from "../validators/postValidator.mjs";
import {authenticate} from "../middlewares/authenticate.mjs";
import {permissions} from "../middlewares/permissions.mjs";

const postsRouter = Router()

postsRouter.use(authenticate)

postsRouter.route('/')
  .get(permissions('readPost'), getPostsHandler)
  .post(validatePostsPost, permissions('createPost'), postPostsHandler);

postsRouter.route('/:postId')
  .get(validateParamsPostsId, permissions('readPost'), getPostByIdHandler)
  .delete(validateParamsPostsId, permissions('deletePost'), deletePostByIdHandler)
  .put(validateParamsPostsId, validatePostsPut, permissions('updatePost'), putPostByIdHandler);

export default postsRouter;
