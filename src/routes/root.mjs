import { Router } from "express"
import {getRootHandler} from "../controllers/root.mjs"
import morgan from 'morgan'

const rootRouter = Router()

rootRouter.use(morgan('tiny'));

rootRouter.route('/').get(getRootHandler)

export default rootRouter