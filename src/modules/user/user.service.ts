import config from '../../config';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   //using built in static method
//   // const result = await StudentModel.create(studentData); //using mongoose builtin static method
//   // return result;

//   //using built in instance method
//   // const result = await new StudentModel(student).save(); // one line from bottom two line
//   // const student = new Student(studentData);

//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new Error('User already exists!!!!');
//   // }

//   // const result = await student.save(); // built in instance method

//   // return result;
//   //
//   //End

//   //For creating custom static methods

//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User / Student already exists!!!!');
//   }

//   const result = await Student.create(studentData);
//   return result;
// };

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //   if (await User.isUserExists(studentData.id)) {
  //     throw new Error('User / Student already exists!!!!');
  //   }
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'student';
  //set manually generated id // for now
  userData.id = '2030100003';

  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
