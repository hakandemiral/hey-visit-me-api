import bcrypt from 'bcrypt';
import passwordComplicator from './passwordComplicator.js';

export default {
    hash: (password) => bcrypt.hashSync(passwordComplicator(password), 10),
    compare: (password, hash) => bcrypt.compareSync(passwordComplicator(password), hash),
};
