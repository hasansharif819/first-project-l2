import { UserServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
// import studentZodValidationSchema from '../students/student.Zod.validation';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  // const zodParsedData = studentZodValidationSchema.parse(userData);
  const result = await UserServices.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
