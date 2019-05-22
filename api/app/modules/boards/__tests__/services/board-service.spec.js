import pick from 'lodash/pick';
import { connect, dropDb, close } from '../../../../utils/mongo';
import { BoardService } from '../../services';
import AppError from '../../../../helpers/appError';

global.AppError = AppError;

describe('Board Service', () => {
    beforeAll(async () => {
        await connect();
        await dropDb();
    });
    afterAll(async () => {
        await dropDb();
        await close();
    });

    it('create board as expected', async () => {
        const boardData = {
            userHash: 'user-hash',
            name: 'name',
            description: 'description',
        };
        const boardModel = await BoardService.createBoard(boardData);
        const board = boardModel.toObject();

        expect(pick(board, Object.keys(boardData))).toEqual(boardData);
        expect(board).toHaveProperty('hash');
        expect(board).toHaveProperty('updatedAt');
        expect(board).toHaveProperty('createdAt');

        await dropDb();
    });

    it('eroare la crearea mai mult de 3 board', async () => {
        const boardData = {
            userHash: 'user-hash',
            name: 'name',
            description: 'description',
        };
        await BoardService.createBoard(boardData);
        await BoardService.createBoard(boardData);
        await BoardService.createBoard(boardData);
        try {
            await BoardService.createBoard(boardData);
        } catch (e) {
            expect(e).toEqual(new AppError({ status: 400, message: 'User cannot create more 3 board' }));
        }
        await dropDb();
    });

    it('eroare la campuri invalide la crearea board', async () => {
        try {
            await BoardService.createBoard({});
        } catch (e) {
            const { errors } = e.toJSON();
            expect(errors).toHaveProperty('userHash');
            expect(errors).toHaveProperty('name');
            expect(errors).toHaveProperty('description');
        }
        await dropDb();
    });
});
