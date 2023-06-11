"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategory = exports.UpdateCategory = exports.CreateCategory = exports.GetFeaturedCategories = exports.GetCategories = void 0;
const _models_1 = require("../models");
const _services_1 = require("../services");
const GetCategories = async (req, res) => {
    try {
        const rootCategories = await _models_1.Category.find({
            parentCategory: null,
            deletedAt: null,
        })
            .select('id name parentId children')
            .exec();
        const tree = await (0, _services_1.buildTree)(rootCategories);
        return (0, _services_1.OK_200)(res, tree);
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.GetCategories = GetCategories;
const GetFeaturedCategories = async (req, res) => {
    try {
        const candidate = await _models_1.Category.find({ featured: true }).populate('name children photo');
        if (!candidate) {
            return (0, _services_1.NotFound_404)(res);
        }
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.GetFeaturedCategories = GetFeaturedCategories;
const CreateCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;
        if (name === '') {
            return (0, _services_1.NotFound_404)(res);
        }
        const doc = new _models_1.Category({ name, parentCategory: parentId });
        await doc.save();
        return (0, _services_1.OK_200)(res, { message: 'successfully added category' });
    }
    catch (err) {
        console.log('err:', err);
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.CreateCategory = CreateCategory;
const UpdateCategory = async (req, res) => {
    try {
        const { id, name, parentName } = req.body;
        const category = await _models_1.Category.findById(id);
        if (!category) {
            return (0, _services_1.NotFound_404)(res);
        }
        if (name) {
            category.name = name;
        }
        if (parentName) {
            const parentCategory = await _models_1.Category.findOne({ name: parentName });
            category.parentCategory = parentCategory.id;
        }
        await category.save();
        return (0, _services_1.OK_200)(res, { message: 'Category updated successfully' });
    }
    catch (err) {
        console.log(err);
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.UpdateCategory = UpdateCategory;
const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const updatedCategory = await _models_1.Category.findOneAndUpdate({ _id: id }, { deletedAt: new Date() }, { new: true });
        if (!updatedCategory) {
            return (0, _services_1.NotFound_404)(res);
        }
        return (0, _services_1.OK_200)(res, {
            message: 'Category added to deleted, you have a month to restore it',
        });
    }
    catch (err) {
        return (0, _services_1.InternalError_500)(res);
    }
};
exports.DeleteCategory = DeleteCategory;
