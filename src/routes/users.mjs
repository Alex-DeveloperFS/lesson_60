import { Router } from "express"
import {
  deleteUserByIdHandler,
  getUserByIdHandler,
  getUsersHandler,
  postUsersHandler,
  putUserByIdHandler
} from "../controllers/users.mjs"
import {validateParamsUserId, validateUserPost, validateUserPut} from "../validators/userValidator.js";
import {authenticate} from "../middlewares/authenticate.mjs";

const usersRouter = Router()


usersRouter.use(authenticate)

usersRouter.route('/')
  .get(getUsersHandler)
  .post(validateUserPost, postUsersHandler)

usersRouter.route('/:userId')
  .get(validateParamsUserId, getUserByIdHandler)
  .delete(validateParamsUserId, deleteUserByIdHandler)
  .put(validateParamsUserId, validateUserPut, putUserByIdHandler)

export default usersRouter