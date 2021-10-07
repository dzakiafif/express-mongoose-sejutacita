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

        const token = jwt.token({ id: checkUserByUsername._id });
        const refreshToken = jwt.refreshToken({ id: checkUserByUsername._id });

        checkUserByUsername.token = token;
        checkUserByUsername.refresh_token = refreshToken;

        return res.json(response.success(checkUserByUsername));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }

    static refreshToken = async (req, res) => {
      try {
        const { refreshToken } = req.body;

        const verifyToken = jwt.verifyRefresh(refreshToken);
        if (!verifyToken.status) {
          return res.status(403).json(response.errors('Forbidden'));
        }

        const token = jwt.token({ id: verifyToken.decode.id });

        const responseApi = {
          token,
        };
        return res.json(response.success(responseApi));
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
        const { password, name } = req.body;

        const checkUserById = await UserService.findUserById({ id });
        if (checkUserById === null) {
          throw `data with id ${id} not found`;
        }

        const result = await UserService.updateUser({ id, name, password });
        return res.json(response.success(result));
      } catch (err) {
        return res.json(response.errors(err));
      }
    }

    static profile = async (req, res) => {
      try {
        const { _id } = req.user;

        const user = await UserService.findUserById({ id: _id });

        return res.json(response.success(user));
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
