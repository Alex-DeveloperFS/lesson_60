import { Router } from "express";
import {
  deleteTodoByIdHandler,
  getTodoByIdHandler,
  getTodosHandler,
  postTodosHandler,
  putTodoByIdHandler
} from "../controllers/todos.mjs";
import {validateParamsTodoId, validateTodoPost, validateTodoPut} from "../validators/todoValidator.mjs";
import {authenticate} from "../middlewares/authenticate.mjs";
import postsRouter from "./posts.mjs";
import {permissions} from "../middlewares/permissions.mjs";

const todosRouter = Router()

todosRouter.use(authenticate)

todosRouter.route('/')
  .get(permissions('readPost'), getTodosHandler)
  .post(validateTodoPost, permissions('createPost'), postTodosHandler)

todosRouter.route('/:todoId')
  .get(validateParamsTodoId, permissions('readPost'), getTodoByIdHandler)
  .delete(validateParamsTodoId, permissions('deletePost'), deleteTodoByIdHandler)
  .put(validateParamsTodoId, validateTodoPut, permissions('updatePost'), putTodoByIdHandler)

export default todosRouter