import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //using built in static method
  // const result = await StudentModel.create(studentData); //using mongoose builtin static method
  // return result;

  //using built in instance method
  // const result = await new StudentModel(student).save(); // one line from bottom two line
  // const student = new Student(studentData);

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!!!!');
  // }

  // const result = await student.save(); // built in instance method

  // return result;
  //
  //End

  //For creating custom static methods

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User / Student already exists!!!!');
  }

  const result = await Student.create(studentData);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
