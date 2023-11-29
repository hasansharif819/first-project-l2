import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/users/create-student', UserController.createStudent);

export const UserRoute = router;
