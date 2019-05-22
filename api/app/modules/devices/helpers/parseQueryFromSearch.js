import { MAX_SIZE, PAGE } from '../constants/pagination';

export default (queryParams) => {
    const filter = {
        name: queryParams.name ? queryParams.name : '',
        description: queryParams.description ? queryParams.description : '',
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
