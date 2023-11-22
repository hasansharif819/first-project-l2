import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './modules/students/student.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application routes
app.use('/api/vi/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hey!!!!!!!!!!!Welcome to mongoose first project');
});

export default app;
