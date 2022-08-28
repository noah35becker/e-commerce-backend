
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
    })
    .then(dbCategoryData => res.json(dbCategoryData))
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
    })
    .then(dbCategoryData => {
        if (!dbCategoryData){
            res.status(404).json({message: 'No category found with this ID'});
            return;
        }
        res.json(dbCategoryData);
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.post('/', (req, res) =>
    Category.create({
        category_name: req.body.name
    }).then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
        console.error(err);
        res.status(400).json(err);
    })
);


router.put('/:id', (req, res) => 
    Category.update(
        {category_name: req.body.name},
        {where: {id: req.params.id}}
    ).then(([wasSuccessful]) => {
        if (!wasSuccessful){
            res.status(404).json({message: 'No category found with this ID'});
            return;
        } else
            res.json({message: 'Success'});
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);


router.delete('/:id', (req, res) =>
    Category.destroy({where: {id: req.params.id}})
    .then(wasSuccessful => {
        if (!wasSuccessful){
            res.status(404).json({message: 'No category found with this ID'});
            return;
        } else
            res.json({message: 'Success'});
    }).catch(err => {
        console.error(err);
        res.status(500).json(err);
    })
);



// EXPORT
module.exports = router;