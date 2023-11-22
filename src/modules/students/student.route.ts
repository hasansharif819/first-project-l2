import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.post('/create-student', StudentController.createStudent);

router.get('/get-students', StudentController.getAllStudents);

router.get('/get-students/:studentId', StudentController.getSingleStudent);

router.delete('/get-students/:studentId', StudentController.deleteStudent);

export const StudentRoute = router;
