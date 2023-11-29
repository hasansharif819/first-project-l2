import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hey!!!!!!!!!!!Welcome to mongoose first project');
});

//Global error handler
app.use(globalErrorHandler);

//Not found
app.use(notFound);

export default app;
