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

    static create = [
      body('fullname').exists().withMessage('fullname must be exist').notEmpty()
        .withMessage('fullname must be not empty')
        .isString()
        .withMessage('fullname must be string'),
      body('username').exists().withMessage('username must be exist').notEmpty()
        .withMessage('username must be not empty')
        .isString('username must be string'),
      body('password').exists().withMessage('password must be exist').notEmpty()
        .withMessage('password must be not empty'),
    ];

    static update = [
      param('id').exists().withMessage('param id must be exist'),
      body('fullname').optional(),
      body('password').optional(),
    ];

    static delete = [
      param('id').exists().withMessage('param id must be exist'),
    ];
}

export default UserValidator;
