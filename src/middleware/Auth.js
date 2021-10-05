import { validationResult } from 'express-validator';
import * as response from '../utils/Response';
import Jwt from '../utils/Jwt';

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

    const bearerAuth = (token) => {
      const verifyToken = Jwt.verify(token);
      if (!verifyToken.status) {
        return res.status(403).json(response.errors('Forbidden'));
      }

      req.decoded = verifyToken.decode;

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
}

export default AuthMiddleware;
