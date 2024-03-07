const express = require('express');
const router = express.Router();
const { getAllProducts, getProductStatic } = require('../controller/product');

router.route('/').get(getAllProducts);
router.route('/static').get(getProductStatic);

module.exports = router;
