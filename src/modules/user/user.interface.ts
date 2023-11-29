export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  isDeleted: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
};
