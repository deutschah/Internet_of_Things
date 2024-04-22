import { Request, Response, Router } from 'express';
import { Operation } from 'express-openapi';
import { DeleteData, GetData, PostData, UpdateData } from '../controllers/dataController';

const router = Router();

router.get('/All', GetData);

router.post('/', PostData);

router.put('/:dateTime', UpdateData);

router.delete('/:dateTime', DeleteData);

export default router;
