const bcrypt = require('bcrypt');

export const hashString = async aString => {
  return bcrypt.hash(aString, 10);
};
