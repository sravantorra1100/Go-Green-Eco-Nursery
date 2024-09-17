import express from 'express'
import {isAdmin,requireSignIn} from '../middlewares/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';

import Review from '../models/reviewModel.js'
import User from '../models/userModel.js'
import productModel from '../models/productModel.js';

const router =express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin, formidable(),createProductController)


//update product
router.put('/update-product/:pid',requireSignIn,isAdmin, formidable(),updateProductController)

//get products
router.get('/get-product',getProductController)

//single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)


//delete product
router.delete('/delete-product/:pid',deleteProductController)

//filter product
router.post('/product-filter',productFilterController) 

//product count 
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product
router.get('/search/:keyword',searchProductController)

//similar product
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise product
router.get('/product-category/:slug',productCategoryController)

//payment gateway
//token
router.get('/braintree/token',braintreeTokenController)

//payments
router.post('/braintree/payment',requireSignIn,braintreePaymentController)


{/* ....reviews */}
// Create a new review
router.post('/reviews', async (req, res) => {
    try {
      const review = new Review(req.body);
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all reviews
  router.get('/reviews', async (req, res) => {
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });





  //get all users
  router.get('/alll-users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

{/* .........*/}







export default router