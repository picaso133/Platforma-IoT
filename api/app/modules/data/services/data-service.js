import { Data } from '../models';
import AppError from '../../../helpers/appError';
import { Field } from '../../fields/models';

export default {
    async createField(data) {
        // const { userHash } = data;
        // const deviceCountByUserId = await Field.count({ userHash });
        // if (deviceCountByUserId === 10) {
        //     throw new AppError({ status: 400, message: 'User cannot create more 10 devices' });
        // }

        return Data.create(data);
    },
    async updateData(input, data) {
        data.set(input);
        try {
            return data.save();
        } catch (e) {
            throw new AppError({ status: 400, ...e });
        }
    },
    async checkField(data) {
        const hash = data.fieldHash;
        if (hash) {
            const field = await Field.findOne({ hash });
            if (!field) {
                throw new AppError({ status: 404, message: `Field with hash "${hash}" not found!` });
            }
            if (field.userHash !== data.userHash) {
                throw new AppError({
                    status: 403,
                    message: `Forbidden. Field with hash "${field.userHash}" dont belong user with hash "${data.userHash}"`,
                });
            }
        }
    },
    async dataWithUser(data, userHash) {
        if (data.userHash !== userHash) {
            throw new AppError({ status: 403, message: `Forbidden. Data with hash "${data.hash}" dont belong user with hash "${userHash}"` });
        }
    },
    async search({ fieldHash, size, page }) {
        const query = {
            // value: { $regex: value },
            fieldHash: { $regex: new RegExp(fieldHash, 'ig') },
        };

        const count = await Field.count(query);
        const pages = Math.ceil(count / size);

        const data = await Data
            .find(query)
            .sort({ updatedAt: '-1' });
            // .limit(size)
            // .skip((page - 1) * size);

        return {
            data,
            count,
            pages,
            page,
        };
    },

};
