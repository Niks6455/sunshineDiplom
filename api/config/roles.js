import { mapObjectKeys } from '../utils/map.js';

const roles = {
    USER: 1,
    ADMINISTRATOR: 2,
};

export default roles;

export const map = mapObjectKeys(roles);
