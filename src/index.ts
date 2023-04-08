import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

require('dotenv').config(); // переменные из .env файла

import database from './database';
import { UserRouter } from './routes/UserRoutes';
import { ProductRouter } from './routes/ProductRoutes';
import { CategoryRouter } from './routes/CategoriesRouter';

const port = process.env.PORT ?? 3000;

export const app = express();
app.use(cors()).use(express.json()).use(fileUpload({})).use(cookieParser());

app.use(UserRouter).use(ProductRouter).use(CategoryRouter);

database.connect();
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
