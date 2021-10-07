import express from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middleware/Auth';
import UserValidator from '../validators/UserValidator';

const router = express.Router();

router.post('/login', [UserValidator.login, AuthMiddleware.Guest], UserController.login);
router.post('/refresh-token', [UserValidator.refresh, AuthMiddleware.Guest], UserController.refreshToken);
router.post('/create-user', [
  UserValidator.create,
  AuthMiddleware.Auth,
  AuthMiddleware.authorize('ADMIN')], UserController.create);
router.get('/profile', [AuthMiddleware.Auth, AuthMiddleware.authorize('USER')], UserController.profile);
router.get('/list-user', [AuthMiddleware.Auth, AuthMiddleware.authorize('ADMIN')], UserController.list);
router.put('/update-user/:id', [UserValidator.update, AuthMiddleware.Auth, AuthMiddleware.authorize('ADMIN')], UserController.update);
router.delete('/delete-user/:id', [UserValidator.delete, AuthMiddleware.Auth, AuthMiddleware.authorize('ADMIN')], UserController.delete);

export default router;
