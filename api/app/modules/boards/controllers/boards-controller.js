import pick from 'lodash/pick';
import { Board } from '../models';
import { BoardService } from '../services';
import parseQueryFromSearch from '../helpers/parseQueryFromSearch';

export default {
    async create(ctx) {
        const boardData = {
            ...pick(ctx.request.body, Board.createFields),
            userHash: ctx.state.user.hash,
        };

        const { _id } = await BoardService.createBoard(boardData);
        const board = await Board.findOne({ _id });

        ctx.status = 201;
        ctx.body = { data: board };
    },
    async update(ctx) {
        const {
            request: {
                body,
            },
            state: {
                user: {
                    hash,
                },
                board,
            },
        } = ctx;

        if (board.userHash !== hash) {
            ctx.throw(403, `Forbidden. Board with hash "${board.hash}" dont belong user with hash "${hash}"`);
        }

        const newData = pick(body, Board.createFields);
        const updateBoard = await BoardService.updateBoard(newData, board);

        ctx.body = { data: updateBoard };
    },
    async delete(ctx) {
        const {
            state: {
                user: {
                    hash,
                },
                board,
            },
        } = ctx;

        if (board.userHash !== hash) {
            ctx.throw(403, `Forbidden. Board with hash "${board.hash}" dont belong user with hash "${hash}"`);
        }

        await board.remove();
        ctx.body = { data: { hash: board.hash } };
    },
    async getBoard(ctx) {
        const { state: { board } } = ctx;
        ctx.body = { data: pick(board, Board.createFields) };
    },
    async searchBoards(ctx) {
        const queryParams = pick(ctx.request.query, ['name', 'description', 'size', 'page']);
        const filter = parseQueryFromSearch(queryParams);
        const { boards, ...rest } = await BoardService.search(filter);
        ctx.body = {
            data: boards,
            filter,
            ...rest,
        };
    },


};
