import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

require('dotenv').config(); // переменные из .env файл

import { Database } from './database';
import { UserRouter } from './routes/UserRouter';
import { ProductRouter } from './routes/ProductRouter';
import { CategoryRouter } from './routes/CategoriesRouter';

const port = process.env.PORT ?? 3000;

const app = express();
app.use(cors()).use(express.json()).use(fileUpload({})).use(cookieParser());

app
	.use('/user', UserRouter)
	.use('/product', ProductRouter)
	.use('/category', CategoryRouter);

Database.connect();
app.listen(port, () => {
	console.log(`app listening on port ${port}`);
});

export { app };
