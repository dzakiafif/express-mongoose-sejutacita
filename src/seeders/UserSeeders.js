import * as encryption from '../utils/Encryption';
import Users from '../models/Users';

const insertUser = async () => {
  const insert = new Users({
    fullname: 'administrator',
    username: 'admin',
    password: encryption.generatedHash('1q2w3e'),
    role: 'ADMIN',
    created_at: new Date(),
    updated_at: new Date(),
  });

  await insert.save();
};

insertUser();
