import { Device } from '../models';

export default () => async (hash, ctx, next) => {
    const device = await Device.findOne({ hash });
    if (!device) {
        throw new AppError({ status: 404, message: `Device with hash "${hash}" not found` });
    }
    ctx.state.device = device;
    await next();
};
