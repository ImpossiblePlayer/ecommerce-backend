import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

require('dotenv').config(); // переменные из .env файл

import { Database } from './database';
import { UserRouter } from './routes/User.router';
import { ProductRouter } from './routes/Product.router';
import { CategoryRouter } from './routes/Categories.router';

const port = process.env.PORT ?? 3000;

export const app = express();
app.use(cors()).use(express.json()).use(fileUpload({})).use(cookieParser());

app.use(UserRouter).use(ProductRouter).use(CategoryRouter);

Database.connect();
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
