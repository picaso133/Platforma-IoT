import pick from 'lodash/pick';
import { Chart } from '../models';
import { ChartService } from '../services';
import parseQueryFromSearch from '../helpers/parseQueryFromSearch';


export default {
    async create(ctx) {
        console.log('creare');
        console.log(ctx.request.body);
        const chartData = {
            ...pick(ctx.request.body, Chart.createFields),
            userHash: ctx.state.user.hash,
        };

        if (ctx.request.body.boardHash) {
            await ChartService.checkBoard(ctx.request.body.boardHash);
        }
        const { _id } = await ChartService.createChart(chartData);
        const chart = await Chart.findOne({ _id });

        ctx.status = 201;
        ctx.body = { data: chart };
    },
    async getChart(ctx) {
        const { state: { chart } } = ctx;
        ctx.body = { data: pick(chart, Chart.createFields) };
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
                chart,
            },
        } = ctx;

        await ChartService.deviceWithUser(chart, hash);

        const newData = pick(body, Chart.createFields);
        const updateChart = await ChartService.updateDevice(newData, chart);

        ctx.body = { data: updateChart };
    },
    async delete(ctx) {
        const {
            state: {
                user: {
                    hash,
                },
                chart,
            },
        } = ctx;

        await ChartService.deviceWithUser(chart, hash);

        await chart.remove();
        ctx.body = { data: { hash: chart.hash } };
    },
    async searchChart(ctx) {
        const queryParams = pick(ctx.request.query, ['name', 'description', 'type', 'params', 'fieldHash', 'boardHash', 'size', 'page']);
        const filter = parseQueryFromSearch(queryParams);
        const { charts, ...rest } = await ChartService.search(filter);
        ctx.body = {
            data: charts,
            filter,
            ...rest,
        };
    },
};
