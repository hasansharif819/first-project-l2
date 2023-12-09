import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods, // for custom instance
  StudentModel,
  TUserName,
} from './student.interface';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
    trim: true, //using for not taking unususal space before and after
    maxlength: [20, 'First Name can not be more than 20 characters'],
    //
    //using Joi validor in student.controller
    //So this validation doesn't need
    //
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //   },
    //   message: '{value} is not in capitalize in format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'Middle Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Last Name can not be more than 20 characters'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not in alphanumeric format',
    // },
  },
});

const guardinSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
    maxlength: [50, "Father's Name can not be more than 50 characters"],
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
    maxlength: [50, "Mother's Name can not be more than 50 characters"],
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
  guardianLocation: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//Regular
// const studentSchema = new Schema<Student>({  // regular method

//using for custom instance method
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({

//For creating custom static methods
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User',
    },
    // password: {
    //   type: String,
    //   maxlength: 20,
    //   required: true,
    // },
    //password comes from user
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Others'],
        message: '{VALUE} is not a valid gender',
      },
      required: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email',
      // },
    },
    contactNo: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
        message: 'Please provide your blood group',
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardinSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// //Middleware
// //Pre middleware save // hook
// studentSchema.pre('save', async function (next) {
//   // console.log(this, 'pre save');

//   //Hashing the password by using bcrypt
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; //doc
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// //post middleware save // hook
// studentSchema.post('save', async function (doc, next) {
//   doc.password = '';
//   // console.log(this, 'post save');
//   next();
// });

//password making hash from user

//Query Middleware
//isDeleted field true hole data show korbe na
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
//findOne er jonno
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

//Aggregate function er jonno

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//Creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

//For creating custom static methods

// studentSchema.statics.isStudentExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

//query middleware
studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isStudentExists = await Student.findOne(query);
  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student is not exists');
  }
  next();
});

//model
//for normal
// export const Student = model<TStudent>('Student', studentSchema);

//For custom instance method
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
