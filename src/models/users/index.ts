import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Schema, SchemaDefinition } from 'mongoose';

import {
  JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_TOKEN_LIFETIME,
  JWT_REFRESH_SECRET_KEY,
  JWT_REFRESH_TOKEN_LIFETIME,
} from '@src/constants';

import type { IUserSchema, TUserMethods, TUserQueries } from './types';

export class UserSchema<
  CUserSchema = never,
  CUserMethods = never,
  CUserQueries = never
> extends Schema<
  CUserSchema & IUserSchema,
  unknown,
  CUserMethods & TUserMethods,
  CUserQueries & TUserQueries
> {
  /**
   *
   */
  constructor(obj: SchemaDefinition, options) {
    //TODO: сделать, чтобы тип опций нормально работал
    super(
      {
        ...obj,
        name: {
          type: String,
          required: true,
        },

        email: {
          type: String,
          lowercase: true,
          unique: true,
          required: true,
          trim: true,
        },
        hash: String,
        refreshTokens: [String],
        isActivated: { type: Boolean, default: true },
      },
      {
        ...options,
        methods: {
          setPassword: async function (password: string): Promise<void> {
            this.hash = await bcrypt.hash(password, 10);
          },
        },
        query: {
          comparePassword: async function (password: string): Promise<boolean> {
            const hash = await bcrypt.hash(password, 10);
            return await bcrypt.compare(password, hash);
          },
          compareRefreshToken: async function (
            token: string
          ): Promise<boolean> {
            const validTokens: Array<string[]> = this.refreshTokens.filter(
              (refreshToken: string) => refreshToken === token
            );
            return validTokens.length > 0;
          },
          generateTokens: async function (): Promise<string[]> {
            const payload = {
              _id: this._id,
              email: this.email,
              isActivated: this.isActivated,
            };

            const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET_KEY, {
              expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
            });
            const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET_KEY, {
              expiresIn: JWT_REFRESH_TOKEN_LIFETIME,
            });

            this.refreshTokens.push(refreshToken);

            return [accessToken, refreshToken];
          },
        },
      }
    );
  }
}
