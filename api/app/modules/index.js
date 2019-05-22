import Router from 'koa-router';
import auth from './auth';
import boards from './boards';
import users from './users';
import devices from './devices';
import fields from './fields';
import data from './data';
import charts from './charts';

const router = new Router({ prefix: '/api' });

router.use(auth);
router.use(boards);
router.use(users);
router.use(devices);
router.use(fields);
router.use(data);
router.use(charts);

export default router.routes();
