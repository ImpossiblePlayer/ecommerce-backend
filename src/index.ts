import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

require('dotenv').config(); // переменные из .env файл
import { CLIENT_URL } from './constants';

import { Database } from './database';
import { ProductRouter, UserRouter, CategoryRouter } from './routes';

const port = process.env.PORT ?? 3000;

const app = express();
app
	.use(cors({ origin: CLIENT_URL, credentials: true }))
	.use(express.json())
	.use(fileUpload({}))
	.use(cookieParser())
	.use(morgan('dev'));

app
	.use('/user', UserRouter)
	.use('/product', ProductRouter)
	.use('/category', CategoryRouter);

Database.connect();
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});

export { app };
