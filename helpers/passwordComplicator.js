const suffix = process.env.BCRYPT_SUFFIX;
const prefix = process.env.BCRYPT_PREFIX;

export default (password) => (prefix + password + suffix);
