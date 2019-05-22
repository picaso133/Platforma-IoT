import faker from 'faker';
import _ from 'lodash';
import { User } from '../modules/users';

function init() {
    const promises = [];

    _.times(20, async () => {
        const userPromise = User.create({
            email: `${faker.lorem.word(5)}-${faker.random.number(1, 999)}@${faker.lorem.word(2, 3)}`,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: 1111,
        });

        promises.push(userPromise);
    });

    return Promise.all(promises);
}

export default init;
