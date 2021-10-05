import bcrypt from 'bcrypt';

const generatedHash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compareHash = (password, resultPassword) => bcrypt.compareSync(password, resultPassword);

export { generatedHash, compareHash };
