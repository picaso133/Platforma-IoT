import { Board } from '../models';

export default () => async (hash, ctx, next) => {
    const board = await Board.findOne({ hash }).select({ password: 0, __v: 0 });
    if (!board) {
        throw new AppError({ status: 404, message: `Board with hash "${hash}" not foundd` });
    }
    ctx.state.board = board;
    await next();
};
