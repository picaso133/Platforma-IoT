import Router from 'koa-router';
import { Data } from './models';
import dataController from './controllers/data-controller';
import checkUser from '../../handlers/checkUser';
import checkData from './handlers/checkData';

const router = new Router({ prefix: '/data' });

router
    .post('/', checkUser(), dataController.create)
    .param('hash', checkData())
    .put('/:hash', checkUser(), dataController.update)
    .delete('/:hash', checkUser(), dataController.delete)
    .get('/', dataController.searchFields)
    .get('/:hash', checkUser(), dataController.getData);

export {
    Data,
};
export default router.routes();
