import pick from 'lodash/pick';
import date from 'date-and-time';
import { Field } from '../models';
import { Data } from '../../data/models';
import { FieldService } from '../services';
import parseQueryFromSearch from '../helpers/parseQueryFromSearch';

export default {
    async create(ctx) {
        console.log(ctx.request.body);
        const fieldData = {
            ...pick(ctx.request.body, Field.createFields),
            userHash: ctx.state.user.hash,
        };

        await FieldService.checkDevice(fieldData);

        const { _id } = await FieldService.createField(fieldData);
        const field = await Field.findOne({ _id });

        ctx.status = 201;
        ctx.body = { data: field };
    },
    async getField(ctx) {
        const { state: { field } } = ctx;

        ctx.body = { data: pick(field, Field.createFields) };
    },
    async getNow(ctx) {
        let labels = [];
        let data = [];
        const { state: { field } } = ctx;
        const now = await Data.findOne({ fieldHash: field.hash }).sort({ createdAt: -1 });
        labels.push(date.format(now.createdAt, 'DD HH:mm:ss'));
        data.push(now.value);

        ctx.body = {
            data: now,
            labels: labels,
            dataSet: data,
        };
    },
    async getDay(ctx) {
        let now = new Date();
        const { state: { field } } = ctx;
        let start = date.addDays(now, -1);
        let labels = [];
        let data = [];
        const get = await Data.find({ fieldHash: field.hash, createdAt: { $lte: now.toISOString(), $gte: start.toISOString() } }).sort({ createdAt: 1 });

        get.forEach(function(entry) {
            labels.push(date.format(entry.createdAt, 'DD HH:mm:ss'));
            data.push(entry.value);
        });

        ctx.body = {
            data: get,
            labels: labels,
            dataSet: data,
        };
    },
    async getWeek(ctx) {
        let now = new Date();
        const { state: { field } } = ctx;
        let start = date.addDays(now, -7);
        let labels = [];
        let data = [];
        const get = await Data.find({ fieldHash: field.hash, createdAt: { $lte: now.toISOString(), $gte: start.toISOString() } }).sort({ createdAt: 1 });

        get.forEach(function(entry) {
            labels.push(date.format(entry.createdAt, 'DD MM HH:mm:ss'));
            data.push(entry.value);
        });

        ctx.body = {
            data: get,
            labels: labels,
            dataSet: data,
        };
    },
    async getMonth(ctx) {
        let now = new Date();
        const { state: { field } } = ctx;
        let start = date.addMonths(now, -1);
        let labels = [];
        let data = [];
        const get = await Data.find({ fieldHash: field.hash, createdAt: { $lte: now.toISOString(), $gte: start.toISOString() } }).sort({ createdAt: 1 });

        get.forEach(function(entry) {
            labels.push(date.format(entry.createdAt, 'DD MM YY HH:mm:ss'));
            data.push(entry.value);
        });

        ctx.body = {
            data: get,
            labels: labels,
            dataSet: data,
        };
    },
    async getYar(ctx) {
        let now = new Date();
        const { state: { field } } = ctx;
        let start = date.addYears(now, -1);
        let labels = [];
        let data = [];
        const get = await Data.find({ fieldHash: field.hash, createdAt: { $lte: now.toISOString(), $gte: start.toISOString() } }).sort({ createdAt: 1 });

        get.forEach(function(entry) {
            labels.push(date.format(entry.createdAt, 'HH:mm:ss'));
            data.push(entry.value);
        });

        ctx.body = {
            data: get,
            labels: labels,
            dataSet: data,
        };
    },
    async getAll(ctx) {
        let labels = [];
        let data = [];
        const { state: { field } } = ctx;
        const get = await Data.find({ fieldHash: field.hash }).sort({ createdAt: 1 });

        get.forEach(function(entry) {
            labels.push(date.format(entry.createdAt, 'HH:mm:ss'));
            data.push(entry.value);
        });

        ctx.body = {
            data: get,
            labels: labels,
            dataSet: data,
        };
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
                field,
            },
        } = ctx;
        await FieldService.fieldWithUser(field, hash);
        const newData = pick(body, Field.createFields);
        const updateField = await FieldService.updateField(newData, field);
        ctx.body = { data: updateField };
    },
    async delete(ctx) {
        const {
            state: {
                user: {
                    hash,
                },
                field,
            },
        } = ctx;

        await FieldService.fieldWithUser(field, hash);

        await field.remove();
        ctx.body = { data: { hash: field.hash } };
    },
    async searchFields(ctx) {
        const queryParams = pick(ctx.request.query, ['name', 'description', 'type', 'deviceHash', 'size', 'page']);
        const filter = parseQueryFromSearch(queryParams);
        const { fields, ...rest } = await FieldService.search(filter);
        ctx.body = {
            data: fields,
            filter,
            ...rest,
        };
    },
};
