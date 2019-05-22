import Router from 'koa-router';
import { Chart } from './models';
import chartController from './controllers/chart-controller';
import checkUser from '../../handlers/checkUser';
import checkChart from './handlers/checkChart';

const router = new Router({ prefix: '/chart' });

router
    .post('/', checkUser(), chartController.create)
    .param('hash', checkChart())
    .put('/:hash', checkUser(), chartController.update)
    .delete('/:hash', checkUser(), chartController.delete)
    .get('/', chartController.searchChart)
    .get('/:hash', checkUser(), chartController.getChart);


export {
    Chart,
};

export default router.routes();
