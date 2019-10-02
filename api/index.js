const express = require('express');
const app = express();
const port = 3300;
const cors = require('cors');
const bodyParser = require('body-parser');
const Api = require('./lib/api');

// Enable cors
app.use(cors());

// Enable json response
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/**
 * Default route
 */
app.get('/', (req, resp) => {
  resp.send('Shop Api');
});

/*****************************************************************************
 * Categories
 *****************************************************************************/
/**
 * All categories
 */
app.get('/categories', (req, res) => Api.getCategories(req, res));

/**
 * Add new category
 */
app.post('/category', (req, res) => Api.addCategory(req, res));

/*****************************************************************************
 * PRODUCTS
 *****************************************************************************/
/**
 * All products
 */
app.get('/products', (req, res) => Api.getAllProducts(req, res));

/**
 * Add new product
 */
app.post('/product', (req, res) => Api.addProduct(req, res));

/**
 * Get product
 */
app.get('/product/:id', (req, res) => Api.getProduct(req, res));

/**
 * Get products by category id
 */
app.get('/products/:category', (req, res) => Api.filterProductsByCategory(req, res));

/**
 * Filter products by price
 */
app.get('/products/:minPrice/:maxPrice', (req, res) => Api.filterProductsByPrice(req, res));

/*****************************************************************************
 * USERS
 *****************************************************************************/

/**
 * Add new user
 */
app.post('/user', (req, res) => Api.addUser(req, res));

/**
 * Get user
 */
app.get('/user/:id', (req, res) => Api.getUser(req, res));

/**
 * Login user
 */
app.post('/user/auth', (req, res) => Api.loginUser(req, res));


/**
 * Start node server
 */
app.listen(port, () => console.log(`Listening on port${port}`));