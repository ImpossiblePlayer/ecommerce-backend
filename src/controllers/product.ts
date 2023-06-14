import * as fs from 'fs';
import * as process from 'process';

import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';

import { Product } from '@models';
import {
  OK_200,
  NotFound_404,
  InternalError_500,
  BadRequest_400,
  convertImagesFlat,
} from '@services';

import type { Request, Response } from 'express';

export const GetProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return NotFound_404(res, {
        message: `there is no product with id '${productId}'`,
      });
    }
    const productData = product._doc;
    return OK_200(res, { ...productData, id: product._id });
  } catch (err) {
    return InternalError_500(res);
  }
};

export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      description,
      deliveryCost,
      quantity,
      advantages,
      price,
      productId,
      mainPhoto,
      additionalPhotos,
    } = req.body;

    console.log(productId, mainPhoto, additionalPhotos);
    if (
      !name ||
      !description ||
      !quantity ||
      !price ||
      !advantages ||
      !category ||
      !deliveryCost
    ) {
      return BadRequest_400(res, {
        message: 'data is not provided',
      });
    }
    console.log(req.body);

    // await Product.create({
    //   _id: productId,
    //   name: name,
    //   description: description,
    //   category: category,
    //   quantity: quantity,
    //   mainPhoto: mainPhoto,
    //   additionalPhotos: additionalPhotos,
    //   price: {
    //     current: price.current,
    //     old: price.old,
    //   },
    //   rating: 0,
    //   soldQuantity: 0,
    //   orders: 0,
    //   advantages: advantages,
    //   reviewsCount: 0,
    //   sellerId: 'Test seller',
    // });

    return OK_200(res, { message: 'success' });
  } catch (err) {
    return InternalError_500(res);
  }
};

export const UpdateProduct = async (req: Request, res: Response) => OK_200(res);
