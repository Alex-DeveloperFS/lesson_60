import { Router } from "express"
import {
  deleteProductByIdHandler,
  getProductByIdHandler,
  getProductsHandler,
  postProductsHandler,
  putProductByIdHandler
} from "../controllers/products.mjs";
import { validateParamsProductsId, validateProductsPost, validateProductsPut } from "../validators/productValidator.mjs";
import {authenticate} from "../middlewares/authenticate.mjs";
import {permissions} from "../middlewares/permissions.mjs";

const productsRouter = Router()

productsRouter.use(authenticate)

productsRouter.route('/')
  .get(permissions('readPost'), getProductsHandler)
  .post(validateProductsPost, permissions('createPost'), postProductsHandler)

productsRouter.route('/:productId')
  .get(validateParamsProductsId, permissions('readPost'), getProductByIdHandler)
  .delete(validateParamsProductsId, permissions('deletePost'), deleteProductByIdHandler)
  .put(validateParamsProductsId, validateProductsPut, permissions('updatePost'), putProductByIdHandler)

export default productsRouter