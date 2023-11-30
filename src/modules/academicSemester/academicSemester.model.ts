import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: ['autum', 'summer', 'fall'],
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
    },
    endMonth: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const User = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
