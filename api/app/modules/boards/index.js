import Router from 'koa-router';
import boardController from './controllers/boards-controller';
import checkUser from '../../handlers/checkUser';
import checkBoard from './handlers/checkBoard';
import { Board } from './models';

const router = new Router({ prefix: '/boards' });

router
    .post('/', checkUser(), boardController.create)
    .get('/', boardController.searchBoards)
    .param('hash', checkBoard())
    .put('/:hash', checkUser(), boardController.update)
    .delete('/:hash', checkUser(), boardController.delete)
    .get('/:hash', checkUser(), boardController.getBoard);


export {
    Board,
};

export default router.routes();
