import pick from 'lodash/pick';
import { Data } from '../models';
import { DataService } from '../services';
import parseQueryFromSearch from '../helpers/parseQueryFromSearch';

export default {
    async create(ctx) {
        // console.log(ctx.request.body);
        const dataP = {
            ...pick(ctx.request.body, Data.createFields),
            userHash: ctx.state.user.hash,
        };

        await DataService.checkField(dataP);

        const { _id } = await DataService.createField(dataP);
        const data = await Data.findOne({ _id });

        ctx.status = 201;
        ctx.body = { data: data };
    },
    async getData(ctx) {
        const { state: { data } } = ctx;
        ctx.body = { data: pick(data, Data.createFields) };
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
                data,
            },
        } = ctx;

        await DataService.dataWithUser(data, hash);
        const newData = pick(body, Data.createFields);
        const updateData = await DataService.updateData(newData, data);
        ctx.body = { data: updateData };
    },
    async delete(ctx) {
        const {
            state: {
                user: {
                    hash,
                },
                data,
            },
        } = ctx;

        await DataService.dataWithUser(data, hash);

        await data.remove();
        ctx.body = { data: { hash: data.hash } };
    },
    async searchFields(ctx) {
        const queryParams = pick(ctx.request.query, ['fieldHash', 'size', 'page']);
        const filter = parseQueryFromSearch(queryParams);
        const { data, ...rest } = await DataService.search(filter);
        ctx.body = {
            data: data,
            filter,
            ...rest,
        };
    },
};
