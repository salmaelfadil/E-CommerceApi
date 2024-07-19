const express = require('express');
const Auth = require('../controllers/auth');
const userController = require('../controllers/user');

const { authorizeRequest } = require('../middleware/authMid');
const { authorizeAdmin } = require('../middleware/authMid');
const productController = require('../controllers/product');
const cartController = require('../controllers/cart');
const orderController = require('../controllers/order');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome to Homepage!");
})

router.post('/test', (req, res) => {
    const username = req.body.username;
    console.log(`${username}`);
    res.send("sucess! your username is " + `${username}`);
})

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.get('/refresh', Auth.refresh);

// user routes
router.put('/user/update/:id', authorizeRequest, userController.update);
router.delete('/user/delete/:id', authorizeRequest, userController.delete);
router.get('/user/:id', authorizeRequest, userController.getUser);
router.get('/allusers', authorizeRequest, userController.getUsers);
router.get('/stats', authorizeRequest, userController.getStats);

// product routes
router.post("/product/create", authorizeAdmin, productController.create);
router.put("/product/update/:id", authorizeAdmin, productController.update);
router.delete("/product/delete/:id", authorizeAdmin, productController.delete);
router.get("/product/:id", authorizeRequest, productController.getProduct);
router.get("/allproducts", authorizeRequest, productController.getProducts);

// cart routes
router.post("/cart/create", authorizeRequest, cartController.create);
router.put("/cart/update/:id", authorizeRequest, cartController.update);
router.delete("/cart/delete/:id", authorizeRequest, cartController.delete);
router.get("/cart/:userId", authorizeRequest, cartController.getUserCart);
router.get("/allcarts", authorizeAdmin, cartController.getCarts);

// order routes
router.post("/order/create", authorizeRequest, orderController.create);
router.put("/order/update/:id", authorizeAdmin, orderController.update);
router.delete("/order/delete/:id", authorizeAdmin, orderController.delete);

router.get("/order/:userId", authorizeRequest, orderController.getUserOrders);
router.get("/allorders", authorizeAdmin, orderController.getOrders);

router.get("/income", authorizeAdmin, orderController.getIncome);


module.exports = router;