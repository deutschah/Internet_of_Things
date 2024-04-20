import { Request, Response, Router } from 'express';
import { Operation } from 'express-openapi';
import {GetMaxData,GetMinData,GetAverageData} from '../controllers/aggregationController';


const router = Router();

router.get('/Max', GetMaxData);

router.get('/Min', GetMinData);

router.get('/Average', GetAverageData);



export default router;
