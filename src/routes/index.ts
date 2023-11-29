import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { StudentRoute } from '../modules/students/student.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
