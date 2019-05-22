import { User } from '../models';

export default {
    async createUser(data) {
        try {
            return await User.create(data);
        } catch (e) {
            throw new AppError({ status: 400, ...e });
        }
    },

    getUserWithPublicFields(params) {
        return User.findOne(params).select({ password: 0, __v: 0, createdAt: 0, updatedAt: 0 });
    },
    updateUser(data, user) {
        user.set(data);
        try {
            return user.save();
        } catch (e) {
            console.log(e);
            throw new AppError({ status: 400, ...e });
        }
    },
};
