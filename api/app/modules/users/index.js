import Router from 'koa-router';
import checkUserByHash from './handlers/checkUserByHash';
import checkUser from '../../handlers/checkUser';
import UserController from './controllers/users-controller';
import { User } from './models';

const router = new Router({ prefix: '/users' });
router
    .param('hash', checkUserByHash())
    .put('/:hash', checkUser(), UserController.update)
    .get('/:hash/boards', UserController.getBoardsByUserHash)
    .get('/:hash/devices', UserController.getDevicesByUserHash)
    .get('/:hash/fields', UserController.getFieldsByUserHash);

export {
    User,
};

export default router.routes();

