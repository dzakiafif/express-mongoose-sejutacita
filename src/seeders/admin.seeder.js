import { Seeder } from 'mongoose-data-seed';
import Users from '../models/Users';

const data = [{
  fullname: 'administrator',
  username: 'admin',
  password: '1q2w3e',
  role: 'ADMIN',
  created_at: new Date(),
  updated_at: new Date(),
}, {
  fullname: 'user dummy',
  username: 'dummy',
  password: '1q2w3e',
  role: 'USER',
  created_at: new Date(),
  updated_at: new Date(),
}];

class AdminSeeder extends Seeder {
  async shouldRun() {
    const count = await Users.countDocuments().exec();

    return count === 0;
  }

  async run() {
    return Users.create(data);
  }
}

export default AdminSeeder;
