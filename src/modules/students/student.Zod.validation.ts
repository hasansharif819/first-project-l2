//Using Zod validation

import { z } from 'zod';

const userNameZodValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().optional(),
  lastName: z.string().min(1).max(20),
});

const guardianZodValidationSchema = z.object({
  fatherName: z.string().min(1).max(50),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1).max(50),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
  guardianLocation: z.string().min(1),
});

const localGuardianZodValidationSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

const studentZodValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
  name: userNameZodValidationSchema,
  gender: z.enum(['Male', 'Female', 'Others']),
  dateOfBirth: z.string().min(1),
  email: z.string().email().min(1),
  contactNo: z.string().min(1),
  emergencyContact: z.string().min(1),
  bloodGroup: z.enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']),
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianZodValidationSchema,
  localGuardian: localGuardianZodValidationSchema,
  profilePicture: z.string().optional(),
  isActive: z.enum(['Active', 'Block']).default('Active'),
  isDeleted: z.boolean(),
});

export default studentZodValidationSchema;
