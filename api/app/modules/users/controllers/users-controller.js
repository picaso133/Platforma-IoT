import pick from 'lodash/pick';
import { User } from '../models';
import { UserService } from '../services';
import { Board } from '../../boards';
import { Device } from '../../devices';
import { Field } from '../../fields';

export default {
    async getBoardsByUserHash(ctx) {
        const { state: { user: { hash: userHash } } } = ctx;
        const boards = await Board.find({ userHash });

        ctx.body = { data: boards };
    },
    async getDevicesByUserHash(ctx) {
        const { state: { user: { hash: userHash } } } = ctx;
        const devices = await Device.find({ userHash });

        ctx.body = { data: devices };
    },
    async getFieldsByUserHash(ctx) {
        const { state: { user: { hash: userHash } } } = ctx;
        const fields = await Field.find({ userHash });

        ctx.body = { data: fields };
    },
    async update(ctx) {
        const {
            request: {
                body,
            },
            state: {
                user,
            },
        } = ctx;

        const newData = pick(body, User.createFields);
        console.log('NEW DATA:');
        console.log(newData);
        const updateUser = await UserService.updateUser(newData, user);

        ctx.body = { data: updateUser };
    },
};
