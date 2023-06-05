import { Category } from '@models';
import { InternalError_500, NotFound_404, OK_200, buildTree } from '@services';

import type { Request, Response } from 'express';

export const GetCategories = async (req: Request, res: Response) => {
  try {
    const rootCategories = await Category.find({
      parentCategory: null,
      deletedAt: null,
    })
      .select('id name parentId children')
      .exec();

    const tree = await buildTree(rootCategories);

    return OK_200(res, tree);
  } catch (err) {
    return InternalError_500(res);
  }
};

export const GetFeaturedCategories = async (req: Request, res: Response) => {
  try {
    // у подкатегорий category.featured = true, нужно получить минимальную цену у продуктов которые записаны там и вернуть ещё её
    const candidate = await Category.find({ featured: true }).populate(
      'name children photo'
    );

    if (!candidate) {
      return NotFound_404(res);
    }
  } catch (err) {
    return InternalError_500(res);
  }
};

export const CreateCategory = async (req: Request, res: Response) => {
  try {
    const { name, parentId } = req.body;
    // ещё должно приходить фото и обрабатываться, лежать где-то на сервере и ссылку на картинку записать в category.image
    if (name === '') {
      return NotFound_404(res);
    }
    const doc = new Category({ name, parentCategory: parentId });

    await doc.save();

    return OK_200(res, { message: 'successfully added category' });
  } catch (err) {
    console.log('err:', err);
    return InternalError_500(res);
  }
};

export const UpdateCategory = async (req: Request, res: Response) => {
  try {
    const { id, name, parentName } = req.body;
    const category = await Category.findById(id);
    // Одно из двух срабатывает, либо обновить имя, либо же изменить родителя (перенести в другое место категорию)
    if (!category) {
      return NotFound_404(res);
    }
    // При вызове update нужно ещё обновить поле updatedAt с датой обновления (потом в админке можно выводить ласт изменения)
    if (name) {
      category.name = name;
    }

    if (parentName) {
      const parentCategory = await Category.findOne({ name: parentName });

      category.parentCategory = parentCategory.id;
    }

    await category.save();

    return OK_200(res, { message: 'Category updated successfully' });
  } catch (err) {
    console.log(err);
    return InternalError_500(res);
  }
};

export const DeleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    // делаю запись о том что был удалён и исключаю из получения эту категорию, думал перед полным удалением сделать задержку чтобы можно было восстановить
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: id },
      { deletedAt: new Date() },
      { new: true }
    );

    if (!updatedCategory) {
      return NotFound_404(res);
    }

    return OK_200(res, {
      message: 'Category added to deleted, you have a month to restore it',
    });
  } catch (err) {
    return InternalError_500(res);
  }
};

// export const setFeaturedCategory = async (req: Request, res: Response) => {};
