import * as response from '../utils/Response';
import UserService from '../services/UserService';
import * as encryption from '../utils/Encryption';
import jwt from '../utils/Jwt';

class UserController {
    static login = async (req, res) => {
      try {
        const { username, password } = req.body;

        const checkUserByUsername = await UserService.checkUser({ username });
        if (checkUserByUsername === null) {
          throw `data with username ${username} not found`;
        }

        if (!encryption.compareHash(password, checkUserByUsername.password)) {
          throw 'password not same. please check again';
        }

        const token = jwt.sign({ id: checkUserByUsername._id });

        checkUserByUsername.token = token;

        return res.json(response.success(checkUserByUsername));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }

    static create = async (req, res) => {
      try {
        const { fullname, username, password } = req.body;

        const checkUserByUsername = await UserService.checkUser({ username });
        if (checkUserByUsername !== null) {
          throw 'Username already exist';
        }

        const result = await UserService.createUser({ fullname, username, password });
        return res.json(response.success(result));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }

    static list = async (req, res) => {
      try {
        const result = await UserService.listUser();
        return res.json(response.success(result));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }

    static update = async (req, res) => {
      try {
        const { id } = req.params;
        const { password, fullname } = req.body;

        const checkUserById = await UserService.findUserById({ id });
        if (checkUserById === null) {
          throw `data with id ${id} not found`;
        }

        const result = await UserService.updateUser({ id, fullname, password });
        return res.json(response.success(result));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }

    static delete = async (req, res) => {
      try {
        const { id } = req.params;
        const checkUserById = await UserService.findUserById({ id });

        if (checkUserById === null) {
          throw `data with id ${id} not found`;
        }

        await UserService.deleteUser({ id });
        return res.json(response.success(null, `data with id ${id} successfully deleted`));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }
}

export default UserController;