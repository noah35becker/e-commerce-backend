
// IMPORTS
const router = require('express').Router();
const {Category, Product} = require('../../models');



// REQUESTS

router.get('/', (req, res) =>
    Category.findAll({
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock']
        }
    }).then(dbCategoriesData => res.json(dbCategoriesData))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.get('/:id', (req, res) =>
    Category.findOne({
        where: {id: req.params.id},
        include: {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock']
        }
    }).then(dbCategoryData => {
        if (!dbCategoryData){
            res.status(404).json({message: `No category found with ID:${req.params.id}`});
            return;
        }
        res.json(dbCategoryData);
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.post('/', (req, res) =>
    Category.create(req.body) // {category_name: ''}
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.error(err);
        res.status(400).json(err);
    })
);


router.put('/:id', (req, res) => 
    Category.update(
        req.body, // {category_name: ''}
        {where: {id: req.params.id}}
    ).then(([wasSuccessful]) => {
        if (!wasSuccessful){
            res.status(400).json({message: `No category found with ID:${req.params.id}; or, no 'real' updates actually submitted`});
            return;
        }
        res.json({message: 'success'});
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.delete('/:id', (req, res) =>
    Category.destroy({where: {id: req.params.id}})
    .then(wasSuccessful => {
        if (!wasSuccessful){
            res.status(404).json({message: `No category found with ID:${req.params.id}`});
            return;
        }
        res.json({message: 'success'});
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);



// EXPORT
module.exports = router;