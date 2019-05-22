import { Field } from '../models';

export default () => async (hash, ctx, next) => {
    const field = await Field.findOne({ hash });
    if (!field) {
        throw new AppError({ status: 404, message: `Field with hash "${hash}" not found` });
    }
    ctx.state.field = field;
    await next();
};
