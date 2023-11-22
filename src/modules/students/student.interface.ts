import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  guardianLocation: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContact: string;
  bloodGroup: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profilePicture?: string;
  isActive: 'Active' | 'Block';
  isDeleted: boolean;
};

// For creating custom instance method

// export type StudentMethods = {
//   isUserExists: (id: string) => Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;

//For creating static method

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
