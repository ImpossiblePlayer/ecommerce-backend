import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';

import { ProductRouter, UserRouter, CategoryRouter } from '@routers';
import { CLIENT_URL } from '@src/constants';
import { Database } from '@src/database';

const port = process.env.PORT ?? 3000;

const app = express();
app
  .use(cors({ origin: CLIENT_URL, credentials: true }))
  .use(express.json())
  .use(fileUpload({}))
  .use(cookieParser())
  .use(
    morgan(function (tokens, req, res) {
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
