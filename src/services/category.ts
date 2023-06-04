import { Category } from '@models';

export const buildTree = async (categories) => {
  const tree = [];
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const children = await Category.find({
      parentCategory: category._id,
      deletedAt: null,
    });
    const subtree = await buildTree(children);

    const categoryData = {
      id: category._id,
      name: category.name,
      parentId: category.parentId || null,
      productsCount: 512,
      children: (subtree.length && subtree) || null,
    };

    tree.push(categoryData);
  }
  return tree;
};
