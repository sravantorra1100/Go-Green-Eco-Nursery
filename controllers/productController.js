import slugify from 'slugify'
import productModel from '../models/productModel.js'
import fs from 'fs'

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' });
            case !description:
                return res.status(500).send({ error: ' description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required & should be less than 1mb' })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'product created successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in creating product',
            error,
        })
    }
}


//get all products
export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "all products",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in getting products",
            error: error.message
        })
    }
}


//single product
export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "single product fetched",
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting single product',
            error
        })
    }
}


//photo controller
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while getting photo',
            error,
        })
    }
}


//delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while deleting product',
            error,
        })
    }
}


//update 
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'name is required' });
            case !description:
                return res.status(500).send({ error: ' description is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'photo is required & should be less than 1mb' })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'product updated successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in update product',
            error,
        })
    }
}


// product filters
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error while filtering products',
            error,
        })
    }
}

//product count (pagenation)
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error in product count',
            error,
        })
    }
}


//product list per page
export const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error in product per page controller',
            error,
        })
    }
}


//search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        }).select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error in serach product API',
            error,
        })
    }
}


//similar products
export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id:{$ne:pid},
            })
            .select("-photo").limit(3)
            .populate("category");
            res.status(200).send({
                success:true,
                products,
            })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'error while getting related product',
            error,
        })
    }
}