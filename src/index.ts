import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import bodyParser from 'body-parser';

require('dotenv').config(); // переменные из .env файл
import { CLIENT_URL } from './constants';

import { Database } from './database';
import { ProductRouter, UserRouter, CategoryRouter } from './routes';

const port = process.env.PORT ?? 3000;

const app = express();
app
	.use(cors())
	.use(bodyParser.json())
	.use(fileUpload({}))
	.use(cookieParser())
	.use(
		morgan('dev', function (tokens, req, res) {
			return [
				tokens.method(req, res),
				tokens.url(req, res),
				tokens.status(req, res),
				tokens.res(req, res, 'content-length'),
				'-',
				tokens['response-time'](req, res),
				'ms',
			].join(' ');
		})
	);

app
	.use('/user', UserRouter)
	.use('/product', ProductRouter)
	.use('/category', CategoryRouter);

Database.connect();
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});

export default app;
