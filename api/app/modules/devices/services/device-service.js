import { Device } from '../models';
import AppError from '../../../helpers/appError';
import { Board } from '../../boards/models';
import { Field } from '../../fields/models';

export default {
    async createDevice(data) {
        // const { userHash } = data;
        // const deviceCountByUserId = await Device.count({ userHash });
        // if (deviceCountByUserId === 10) {
        //     throw new AppError({ status: 400, message: 'User cannot create more 10 devices' });
        // }

        return Device.create(data);
    },
    updateDevice(data, device) {
        device.set(data);
        try {
            return device.save();
        } catch (e) {
            console.log(e);
            throw new AppError({ status: 400, ...e });
        }
    },
    async checkBoard(hash) {
        const board = await Board.findOne({ hash });
        if (!board) {
            throw new AppError({ status: 404, message: `Board with hash "${hash}" not found!` });
        }
    },
    async deviceWithUser(device, userHash) {
        if (device.userHash !== userHash) {
            throw new AppError({ status: 403, message: `Forbidden. Device with hash "${device.hash}" dont belong user with hash "${userHash}"` });
        }
    },
    async search({ name, description, size, page }) {
        const query = {
            name: { $regex: new RegExp(name, 'ig') },
            description: { $regex: new RegExp(description, 'ig') },
        };

        const count = await Field.count(query);
        const pages = Math.ceil(count / size);

        const boards = await Device
            .find(query)
            .sort({ updatedAt: '-1' })
            .limit(size)
            .skip((page - 1) * size);

        return {
            boards,
            count,
            pages,
            page,
        };
    },

};
