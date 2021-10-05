import { body, param } from 'express-validator';

class UserValidator {
    static login = [
      body('username').exists().withMessage('username must be exist').notEmpty()
        .withMessage('username must be not empty')
        .isString()
        .withMessage('username must be string'),
      body('password').exists().withMessage('password must be exist').notEmpty()
        .withMessage('password must be not empty')
        .isString()
        .withMessage('password must be string'),
    ];
}

export default UserValidator;
