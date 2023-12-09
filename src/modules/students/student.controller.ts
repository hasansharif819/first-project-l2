import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import studentZodValidationSchema from './student.Zod.validation'; // For Zod Validation
// import studentJoiValidationSchema from './student.validation'; //For Joi validation

// const createStudent = async (req: Request, res: Response) => {
//   try {
//     const { student: studentData } = req.body;

//     //Joi validation start
//     //using Joi validation
//     // const { error, value } = studentJoiValidationSchema.validate(studentData);
//     // const result = await StudentServices.createStudentIntoDB(value);

//     // console.log({error}, {value});

//     // if (error) {
//     //   res.status(500).json({
//     //     success: false,
//     //     message: 'Student couldnot created... validate error found in Joi!!!',
//     //     error: error.details,
//     //   });
//     // }
//     //else
//     //Joi validation End

//     //Zod validation Start

//     const zodParsedData = studentZodValidationSchema.parse(studentData);
//     const result = await StudentServices.createStudentIntoDB(zodParsedData);

//     //Zod validation end

//     //using normal
//     // const result = await StudentServices.createStudentIntoDB(studentData);
//     res.status(200).json({
//       success: true,
//       message: 'Student created successfully',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Student could not create successfully',
//       error: error,
//     });
//   }
// };

//create user theke hobe

//Reduce try-catch using Promise
//catchAsync function comes from utils catchAsync

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All Student Fetched successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Single Student Fetched successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Student successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated succesfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
