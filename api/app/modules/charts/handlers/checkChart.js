import { Chart } from '../models';

export default () => async (hash, ctx, next) => {
    const chart = await Chart.findOne({ hash });
    if (!chart) {
        throw new AppError({ status: 404, message: `Graficul cu hash-ul dat:"${hash}" nu exista` });
    }
    ctx.state.chart = chart;
    await next();
};
