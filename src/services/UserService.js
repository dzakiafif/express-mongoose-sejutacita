import Users from '../models/Users';
import * as encryption from '../utils/Encryption';

class UserService {
    static createUser = async ({ fullname, username, password }) => {
      const result = await new Users({
        fullname,
        username,
        password,
        role: 'USER',
      }).save();

      return result;
    }

    static checkUser = async ({ username }) => {
      const result = await Users.findOne({ username }).lean().exec();
      return result;
    }

    static listUser = async () => {
      const result = await Users.find({}).exec();
      return result;
    }

    static findUserById = async ({ id }) => {
      const result = await Users.findById(id).exec();
      return result;
    }

    static updateUser = async ({ id, name, password }) => {
      const updateUser = await Users.findByIdAndUpdate(id, {
        fullname: name,
        password: encryption.generatedHash(password),
      });
      const result = await Users.findById(updateUser._id);
      return result;
    }

    static deleteUser = async ({ id }) => {
      const result = await Users.findByIdAndDelete(id);
      return result;
    }
}

export default UserService;
