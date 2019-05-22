import Router from 'koa-router';
import { Device } from './models';
import deviceController from './controllers/devices-controller';
import checkUser from '../../handlers/checkUser';
import checkDevice from './handlers/checkDevice';

const router = new Router({ prefix: '/device' });

router
    .post('/', checkUser(), deviceController.create)
    .param('hash', checkDevice())
    .put('/:hash', checkUser(), deviceController.update)
    .delete('/:hash', checkUser(), deviceController.delete)
    .get('/', deviceController.searchDevices)
    .get('/:hash', checkUser(), deviceController.getDevice);


export {
    Device,
};

export default router.routes();
