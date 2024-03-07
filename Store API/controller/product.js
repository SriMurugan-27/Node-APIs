const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilter } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    let result = Product.find(queryObject); // No need to await here
    //Sorting 
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList); // Sorting directly here
    } else {
        result = result.sort('createdAt'); // Default sorting
    }

    //Selecting
    if(fields){
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    //Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);

    //Numeric Filter
    if(numericFilter){
        const operationMatch = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte'
        };

        const regEx = /\b(<|<=|=|>|>=)\b/g;
        let filter = numericFilter.replace(regEx, (match) => `-${operationMatch[match]}-`);
        const options = ['price', 'rating'];
        filter = filter.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if(options.includes(field)){
                queryObject[field] = { [operator]: Number(value)};
            }
        });

        result = Product.find(queryObject);
    }
    try {
        const products = await result.exec(); // Executing the query to get products
        res.status(200).json({ products, nbHits: products.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getProductStatic = async (req, res) => {
    const products = await Product.find({ price: { $gt: 25 }}).sort('name -price').select('name price');
    res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getProductStatic} ;