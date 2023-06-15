import type { Response } from 'express';

type Res = <T>(res: Response, json?: T) => Response;

const response = (res: Response, status: number) => res.status(status);
const resWithJson = <T>(res: Response, status: number, json: T) =>
  response(res, status).json(json);

export const OK_200: Res = (res, json) => {
  return resWithJson(res, 200, json);
};

export const Created_201: Res = (res, json) => {
  return json ? resWithJson(res, 201, json) : response(res, 201);
};

export const NoContent_204: Res = res => {
  return response(res, 204);
};

export const BadRequest_400: Res = (res, json) => {
  return json ? resWithJson(res, 400, json) : response(res, 400);
};

export const Unautorised_401: Res = res => {
  return response(res, 401);
};

export const Forbidden_403: Res = (res, json) => {
  return json ? resWithJson(res, 403, json) : response(res, 403);
};

export const NotFound_404: Res = res => {
  return response(res, 404);
};

export const InternalError_500: Res = (res, json) => {
  return json ? resWithJson(res, 500, json) : response(res, 500);
};
