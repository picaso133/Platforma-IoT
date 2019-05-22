import { MONGO_URI } from '../config';
import mongooseConector from '../connectors/mongoose-connector';
import userSeeds from './user-seeds';
import boardSeeds from './board-seeds';

initSeeds();

async function initSeeds() {
    const mongoConnection = await mongooseConector(MONGO_URI);

    await mongoConnection.dropDatabase();

    try {
        const users = await userSeeds();
        const boards = await boardSeeds(users);
        console.log(boards);
    } catch (e) {
        console.log(e);
    } finally {
        mongoConnection.close();
    }
}
