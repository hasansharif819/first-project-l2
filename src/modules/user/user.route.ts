import express from 'express';
import { UserController } from './user.controller';
import { studentZodValidations } from '../students/student.Zod.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

const { createStudentZodValidationSchema } = studentZodValidations;

router.post(
  '/create-student',
  validateRequest(createStudentZodValidationSchema),
  UserController.createStudent,
);

export const UserRoute = router;
