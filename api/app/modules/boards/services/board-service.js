import { Board } from '../models';
import AppError from '../../../helpers/appError';

export default {
    async createBoard(data) {
        // const { userHash } = data;
        // const boardCountByUserId = await Board.count({ userHash });

        // if (boardCountByUserId === 3) {
            // throw new AppError({ status: 400, message: 'User cannot create more 3 board' });
        // }

        return Board.create(data);
    },

    async updateBoard(data, board) {
        board.set(data);
        try {
            return board.save();
        } catch (e) {
            console.log(e);
            throw new AppError({ status: 400, ...e });
        }
    },
    async search({ name, description, size, page }) {
        const query = {
            name: { $regex: new RegExp(name, 'ig') },
            description: { $regex: new RegExp(description, 'ig') },
        };

        const count = await Board.count(query);
        const pages = Math.ceil(count / size);
        const boards = await Board
            .find(query)
            .sort({ updatedAt: '-1' })
            .limit(size)
            .skip((page - 1) * size);

        return {
            boards,
            count,
            pages,
        };
    },
};
