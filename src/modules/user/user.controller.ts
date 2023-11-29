import { Request, Response, NextFunction } from 'express';
import { UserServices } from './user.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
// import studentZodValidationSchema from '../students/student.Zod.validation';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    // const zodParsedData = studentZodValidationSchema.parse(userData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    // res.status(200).json({
    //   success: true,
    //   message: 'Student created successfully',
    //   data: result,
    // });
    //From global sendResponse
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(500).json({
    //   success: false,
    //   message: error.message || 'Student could not create successfully',
    //   error: error,
    // });
    //Error handling from global error handler
    next(error);
  }
};

export const UserController = {
  createStudent,
};
