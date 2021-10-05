import express from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middleware/Auth';
import UserValidator from '../validators/UserValidator';

const router = express.Router();

router.post('/login', [AuthMiddleware.Guest, UserValidator.login], UserController.login);
router.post('/create-user', [
  AuthMiddleware.Auth,
  AuthMiddleware.authorize('ADMIN'),
  UserValidator.create], UserController.create);
router.get('/list-user', [AuthMiddleware.Auth, AuthMiddleware.authorize('ADMIN')], UserController.list);
router.put('/update-user/:id', [AuthMiddleware.Auth, AuthMiddleware.authorize('ADMIN'), UserValidator.update], UserController.update);
router.delete('/delete-user/:id', [AuthMiddleware.Auth, AuthMiddleware.authorize('ADMIN'), UserValidator.delete], UserController.delete);

export default router;
