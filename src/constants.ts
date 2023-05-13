import importEnv from 'dotenv';

importEnv.config(); // переменные из .env файл

export const enum HTTP_STATUSE_CODES {
  OK_200 = 200,
  CREATED_201 = 201,
  NO_CONTENT_204 = 204,
  BAD_REQUEST_400 = 400,
  UNAUTHORIZED_401 = 401,
  FORBIDDEN_403 = 403,
  NOT_FOUND_404 = 404,
  ITERNAL_ERROR_500 = 500,
}

export const {
  MONGODB_URI,
  JWT_REFRESH_SECRET_KEY,
  JWT_ACCESS_SECRET_KEY,
  JWT_REFRESH_TOKEN_LIFETIME,
  JWT_ACCESS_TOKEN_LIFETIME,
} = process.env;

export const CLIENT_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_URL
    : process.env.DEV_URL;
