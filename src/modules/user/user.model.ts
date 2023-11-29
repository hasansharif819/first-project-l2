import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'student', 'faculty'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
  },
  {
    timestamps: true,
  },
);

//Pre middleware save // hook
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post middleware save // hook
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

// userSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = await User.findOne({ id });
//   return existingUser;
// };

export const User = model<TUser>('User', userSchema);
