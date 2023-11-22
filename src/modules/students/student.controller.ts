import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentZodValidationSchema from './student.Zod.validation'; // For Zod Validation
// import studentJoiValidationSchema from './student.validation'; //For Joi validation

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //Joi validation start
    //using Joi validation
    // const { error, value } = studentJoiValidationSchema.validate(studentData);
    // const result = await StudentServices.createStudentIntoDB(value);

    // console.log({error}, {value});

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Student couldnot created... validate error found in Joi!!!',
    //     error: error.details,
    //   });
    // }
    //else
    //Joi validation End

    //Zod validation Start

    const zodParsedData = studentZodValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);

    //Zod validation end

    //using normal
    // const result = await StudentServices.createStudentIntoDB(studentData);
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Student could not create successfully',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Students not fetched successfully',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Single student fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Student id is not fetched successfully',
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'This student is deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'This student is not deleted',
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
