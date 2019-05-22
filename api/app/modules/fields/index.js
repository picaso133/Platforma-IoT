import Router from 'koa-router';
import { Field } from './models';
import fieldController from './controllers/fields-controller';
import checkUser from '../../handlers/checkUser';
import checkField from './handlers/checkField';

const router = new Router({ prefix: '/field' });

router
    .post('/', checkUser(), fieldController.create)
    .param('hash', checkField())
    .put('/:hash', checkUser(), fieldController.update)
    .delete('/:hash', checkUser(), fieldController.delete)
    .get('/', checkUser(), fieldController.searchFields)
    .get('/:hash', checkUser(), fieldController.getField)
    .get('/:hash/now', checkUser(), fieldController.getNow)
    .get('/:hash/day', checkUser(), fieldController.getDay)
    .get('/:hash/week', checkUser(), fieldController.getWeek)
    .get('/:hash/month', checkUser(), fieldController.getMonth)
    .get('/:hash/yar', checkUser(), fieldController.getYar)
    .get('/:hash/all', checkUser(), fieldController.getAll);

export {
    Field,
};
export default router.routes();
