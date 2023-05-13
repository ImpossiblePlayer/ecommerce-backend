import { Product } from '@models';
import { OK_200, NotFound_404, InternalError_500 } from '@services';

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
    // const {};
  } catch (err) {
    return InternalError_500(res);
  }
};

export const UpdateProduct = async (req: Request, res: Response) => OK_200(res);
