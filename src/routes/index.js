import express from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middleware/Auth';
import UserValidator from '../validators/UserValidator';

const router = express.Router();

router.post('/login', [UserValidator.login, AuthMiddleware.Guest], UserController.login);
router.post('/create-user', UserController.create);
router.get('/list-user', UserController.list);
router.put('/update-user/:id', UserController.update);
router.delete('/delete-user/:id', UserController.delete);

export default router;
