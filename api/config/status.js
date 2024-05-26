import { mapObjectKeys } from '../utils/map.js';

const status = {
    'В обработке': 1,
    Подтвержден: 2,
    Отклонен: 3,
    Завершен: 4,
};

export default status;

export const map = mapObjectKeys(status);
