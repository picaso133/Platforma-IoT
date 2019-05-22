import { Data } from '../models';

export default () => async (hash, ctx, next) => {
    const data = await Data.findOne({ hash });
    if (!data) {
        throw new AppError({ status: 404, message: `Data with hash "${hash}" not found` });
    }
    ctx.state.data = data;
    await next();
};
