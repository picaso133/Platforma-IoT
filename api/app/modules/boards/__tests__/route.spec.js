import supertest from 'supertest';
import server from '../../../server';
import {
    dropDb,
    close,
} from '../../../utils/mongo';
import { BoardService } from '../services';

describe('Board routes', () => {
    describe('Board search', () => {
        // beforeAll (async () => {
        //     await connect();
        //     await dropDb();
        // });
        afterAll(async () => {
            await dropDb();
            await close();
            await server.close();
        });

        it('nu exista inregistrari in DB', async () => {
            const resp = await supertest(server).get('/api/boards');
            expect(resp.body).toEqual({
                data: [],
                filter: {
                    name: '',
                    description: '',
                    size: 20,
                    page: 1,
                },
                count: 0,
                pages: 0,
            });
        });

        it('rezultate dupa cautari', async () => {
            await BoardService.createBoard({
                name: 'arduino',
                description: 'desc',
                userHash: 'user-hash',
            });
            await BoardService.createBoard({
                name: 'mbed',
                description: 'desc',
                userHash: 'user-hash',
            });
            await BoardService.createBoard({
                name: 'linux',
                description: 'desc',
                userHash: 'user-hash',
            });
            const resp = await supertest(server).get('/api/boards?name=ard');
            const { body: { filter, data, count, pages } } = resp;
            expect(filter).toEqual({
                name: 'ard',
                description: '',
                size: 20,
                page: 1,
            });
            expect(data).toHaveLength(1);
            expect(count).toBe(1);
            expect(pages).toBe(1);
        });
        it('cautare fara rezultat', async () => {
            const resp = await supertest(server).get('/api/boards?name=as');
            const { body: { filter, data, count, pages } } = resp;
            expect(filter).toEqual({
                name: 'as',
                description: '',
                size: 20,
                page: 1,
            });
            expect(data).toHaveLength(0);
            expect(count).toBe(0);
            expect(pages).toBe(0);
        });
    });
});
