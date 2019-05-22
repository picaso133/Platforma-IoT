import parseQueryFromSearch from '../../helpers/parseQueryFromSearch';

describe('parseQueryFromSearch', () => {
    it('parsare query fara parametri', () => {
        const res = parseQueryFromSearch({ fakeParam: 'false' });
        expect(res).toEqual({
            name: '',
            description: '',
            size: 20,
            page: 1,
        });
    });

    it('parsare query cu parametri', () => {
        const data = {
          name: 'name',
          description: 'desc',
          size: 13,
          page: 2,
        };
        const res = parseQueryFromSearch(data);
        expect(res).toEqual({
            ...data,
        });
    });

    it('return size default', () => {
        const res = parseQueryFromSearch({ size: 30 });
        expect(res).toEqual({
            name: '',
            description: '',
            size: 20,
            page: 1,
        });
    });
});
