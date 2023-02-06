const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyHash = (hashFromDB, passwordSend) => {
  return argon2.verify(hashFromDB, passwordSend, hashingOptions);
};

module.exports = { verifyHash };
