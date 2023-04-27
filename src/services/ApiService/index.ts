import type { Response } from 'express';

type Res = <T>(res: Response, json?: T) => Response;

const Res = (res: Response, status: number) => res.status(status);
const ResWithJson = <T>(res: Response, status: number, json: T) =>
	Res(res, status).json(json);

export const OK_200: Res = (res, json) => {
	return ResWithJson(res, 200, json);
};

export const Created_201: Res = (res, json) => {
	return json ? ResWithJson(res, 201, json) : Res(res, 201);
};

export const NoContent_204: Res = (res) => {
	return Res(res, 204);
};

export const BadRequest_400: Res = (res, json) => {
	return json ? ResWithJson(res, 400, json) : Res(res, 400);
};

export const Unautorised_401: Res = (res) => {
	return Res(res, 401);
};

export const Forbidden_403: Res = (res, json) => {
	return json ? ResWithJson(res, 403, json) : Res(res, 403);
};

export const NotFound_404: Res = (res) => {
	return Res(res, 404);
};

export const InternalError_500: Res = (res, json) => {
	return json ? ResWithJson(res, 500, json) : Res(res, 500);
};
