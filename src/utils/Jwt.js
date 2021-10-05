import jwt from 'jsonwebtoken';
import config from '../config/config';

class Jwt {
  static OPTIONS = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  static sign = (payload) => jwt.sign(payload, config.secret, this.OPTIONS);

  static verify = (token) => {
    const response = { status: true, message: null, decode: null };
    jwt.verify(token, config.secret, this.OPTIONS, (err, decoded) => {
      if (err) {
        response.status = false;
        response.message = 'Forbidden';
      }

      if (decoded) {
        response.decode = decoded;
      }
    });

    return response;
  };
}

export default Jwt;
