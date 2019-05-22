import pick from 'lodash/pick';
import { Device } from '../models';
import { DeviceService } from '../services';
import parseQueryFromSearch from '../helpers/parseQueryFromSearch';


export default {
    async create(ctx) {
        console.log(ctx.request.body);
        const deviceData = {
            ...pick(ctx.request.body, Device.createFields),
            userHash: ctx.state.user.hash,
        };

        if (ctx.request.body.boardHash) {
            await DeviceService.checkBoard(ctx.request.body.boardHash);
        }
        const { _id } = await DeviceService.createDevice(deviceData);
        const device = await Device.findOne({ _id });

        ctx.status = 201;
        ctx.body = { data: device };
    },
    async getDevice(ctx) {
        const { state: { device } } = ctx;
        ctx.body = { data: pick(device, Device.createFields) };
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
                device,
            },
        } = ctx;

        await DeviceService.deviceWithUser(device, hash);

        const newData = pick(body, Device.createFields);
        const updateDevice = await DeviceService.updateDevice(newData, device);

        ctx.body = { data: updateDevice };
    },
    async delete(ctx) {
        const {
            state: {
                user: {
                    hash,
                },
                device,
            },
        } = ctx;

        await DeviceService.deviceWithUser(device, hash);

        await device.remove();
        ctx.body = { data: { hash: device.hash } };
    },
    async searchDevices(ctx) {
        const queryParams = pick(ctx.request.query, ['name', 'description', 'size', 'page']);
        const filter = parseQueryFromSearch(queryParams);
        const { devices, ...rest } = await DeviceService.search(filter);
        ctx.body = {
            data: devices,
            filter,
            ...rest,
        };
    },
};
