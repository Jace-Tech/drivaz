import { Router } from 'express';

import uploadRoute from './upload.routes';
import driverRoute from './driver.routes';


const routes = Router()

routes.use("/upload", uploadRoute)
routes.use("/driver", driverRoute)


export default routes