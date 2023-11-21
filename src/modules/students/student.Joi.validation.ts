//Using Joi Validation

import Joi from 'joi';

const userNameJoiValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, 'capitalize'),
  middleName: Joi.string().trim().max(20),
  lastName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Za-z]+$/, 'alphanumeric'),
});

const guardianJoiValidationSchema = Joi.object({
  fatherName: Joi.string().required().max(50),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required().max(50),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
  guardianLocation: Joi.string().required(),
});

const localGuardianJoiValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentJoiValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameJoiValidationSchema.required(),
  gender: Joi.string().valid('Male', 'Female', 'Others').required(),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContact: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'B+',
    'AB+',
    'O+',
    'A-',
    'B-',
    'AB-',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianJoiValidationSchema.required(),
  localGuardian: localGuardianJoiValidationSchema.required(),
  profilePicture: Joi.string(),
  isActive: Joi.string().valid('Active', 'Block').default('Active'),
});

export default studentJoiValidationSchema;
