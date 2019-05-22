import { MAX_SIZE, PAGE } from '../constants/pagination';

export default (queryParams) => {
    const filter = {
        fieldHash: queryParams.fieldHash ? queryParams.fieldHash : '',
        size: parseInt(queryParams.size),
        page: parseInt(queryParams.page),
    };

    if (!filter.size || filter.size > MAX_SIZE) {
        filter.size = MAX_SIZE;
    }

    if (!filter.page) {
        filter.page = PAGE;
    }

    return filter;
};
