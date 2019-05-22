import { Field } from '../models';
import AppError from '../../../helpers/appError';
import { Device } from '../../devices/models';

export default {
    async createField(data) {
        // const { userHash } = data;
        // const deviceCountByUserId = await Field.count({ userHash });
        // if (deviceCountByUserId === 10) {
        //     throw new AppError({ status: 400, message: 'User cannot create more 10 devices' });
        // }

        return Field.create(data);
    },
    async updateField(data, field) {
        field.set(data);
        try {
            return field.save();
        } catch (e) {
            throw new AppError({ status: 400, ...e });
        }
    },
    async checkDevice(field) {
        const hash = field.deviceHash;
        const device = await Device.findOne({ hash });
        if (!device) {
            throw new AppError({ status: 404, message: `Device with hash "${hash}" not found!` });
        }
        if (device.userHash !== field.userHash) {
            throw new AppError({ status: 403, message: `Forbidden. Device with hash "${device.userHash}" dont belong user with hash "${field.userHash}"` });
        }
    },
    async fieldWithUser(field, userHash) {
        if (field.userHash !== userHash) {
            throw new AppError({ status: 403, message: `Forbidden. Field with hash "${field.hash}" dont belong user with hash "${userHash}"` });
        }
    },
    async search({ name, description, type, deviceHash, size, page }) {
        const query = {
            name: { $regex: new RegExp(name, 'ig') },
            description: { $regex: new RegExp(description, 'ig') },
            type: { $regex: new RegExp(type, 'ig') },
            deviceHash: { $regex: new RegExp(deviceHash, 'ig') },
        };

        const count = await Field.count(query);
        const pages = Math.ceil(count / size);

        const fields = await Field
            .find(query)
            .populate('device')
            .sort({ updatedAt: '-1' })
            .limit(size)
            .skip((page - 1) * size);

        return {
            fields,
            count,
            pages,
            page,
        };
    },

};
