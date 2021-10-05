import { validationResult } from 'express-validator';
import * as response from '../utils/Response';
import Jwt from '../utils/Jwt';
import Users from '../models/Users';

class AuthMiddleware {
  static Guest = (req, res, next) => this.handler('guest', req, res, next);

  static Auth = (req, res, next) => this.handler('auth', req, res, next);

  static handler = (type, req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const extractedErrors = [];
      errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));

      return res.status(422).json(response.errors(extractedErrors));
    }

    switch (type) {
      case 'guest':
        return next();
      case 'auth':
        return this.AuthHandle(req, res, next);
      default:
        return res.status(403).json(response.errors('Forbidden'));
    }
  };

  static AuthHandle = (req, res, next) => {
    const {
      headers: { authorization = undefined },
    } = req;

    const unauthorized = () => res.status(401).json(response.errors('Unathorized'));

    if (!authorization) return unauthorized();

    const bearerAuth = async (token) => {
      const verifyToken = Jwt.verify(token);
      if (!verifyToken.status) {
        return res.status(403).json(response.errors('Forbidden'));
      }

      const user = await Users.findById(verifyToken.decode.id);

      req.user = user;

      return next();
    };

    try {
      const [type, payload] = authorization.split(' ');

      switch (type) {
        case 'Bearer':
          return bearerAuth(payload);
        default:
          return unauthorized();
      }
    } catch (err) {
      console.log(err);
      return unauthorized();
    }
  };

  static authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).json(response.errors(`User with role ${req.user.role} not authorized to this api`));
    }

    return next();
  }
}

export default AuthMiddleware;
