import faker from 'faker';
import _ from 'lodash';
import { Board } from '../modules/boards';

export default (users) => {
    if (!users || !users.length) {
        throw Error('Users is required');
    }
    const promises = [];

    _.times(20, async () => {
        const boardPromise = Board.create({
            name: faker.lorem.word(5, 10),
            description: faker.lorem.sentence(),
            userHash: users[faker.random.number(19)].hash,
        });

        promises.push(boardPromise);
    });

    return Promise.all(promises);
};
